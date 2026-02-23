const POSTER_API_TOKEN = process.env.POSTER_API_TOKEN!;
const POSTER_BASE_URL = "https://joinposter.com/api";

export interface PosterCategory {
  category_id: string;
  category_name: string;
  category_photo: string | null;
  parent_category: string;
  category_hidden: string;
  sort_order: string;
}

export interface PosterSpot {
  spot_id: string;
  price: string;
  profit: string;
  profit_netto: string;
  visible: string;
}

export interface PosterSource {
  id: string;
  name: string;
  price: string;
  visible: string;
}

export interface PosterProduct {
  product_id: string;
  product_name: string;
  menu_category_id: string;
  category_name: string;
  cost: string;
  photo: string;
  photo_origin: string | null;
  sort_order: string;
  type: string;
  weight_flag: string;
  spots?: PosterSpot[];
  sources?: PosterSource[];
  price?: Record<string, string> | string;
  out: number;
  hidden?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  photo: string | null;
  parentId: string;
  sortOrder: number;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number;
  photo: string | null;
  outOfStock: boolean;
}

function getPosterPhotoUrl(photo: string | null): string | null {
  if (!photo) return null;
  return `https://joinposter.com${photo}`;
}

function getProductPrice(product: PosterProduct): number {
  // Price from spots (in kopecks / cents -- divide by 100)
  if (product.spots && product.spots.length > 0) {
    return parseInt(product.spots[0].price, 10) / 100;
  }
  // Price from price object
  if (product.price && typeof product.price === "object") {
    const firstKey = Object.keys(product.price)[0];
    if (firstKey) {
      return parseInt(product.price[firstKey], 10) / 100;
    }
  }
  // Price as string
  if (product.price && typeof product.price === "string") {
    return parseInt(product.price, 10) / 100;
  }
  return 0;
}

export async function getCategories(): Promise<MenuCategory[]> {
  const res = await fetch(
    `${POSTER_BASE_URL}/menu.getCategories?token=${POSTER_API_TOKEN}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  const categories: PosterCategory[] = data.response || [];

  return categories
    .filter((c) => c.category_hidden !== "1")
    .map((c) => ({
      id: c.category_id,
      name: c.category_name,
      photo: getPosterPhotoUrl(c.category_photo),
      parentId: c.parent_category,
      sortOrder: parseInt(c.sort_order, 10),
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProducts(): Promise<MenuItem[]> {
  const res = await fetch(
    `${POSTER_BASE_URL}/menu.getProducts?token=${POSTER_API_TOKEN}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  const products: PosterProduct[] = data.response || [];

  return products
    .filter((p) => {
      // Skip hidden products
      if (p.hidden === "1") return false;

      // Only include products visible in at least one spot (Poster QR visibility)
      if (p.spots && p.spots.length > 0) {
        const hasVisibleSpot = p.spots.some((s) => s.visible === "1");
        if (!hasVisibleSpot) return false;
      }

      return true;
    })
    .map((p) => ({
      id: p.product_id,
      name: p.product_name,
      categoryId: p.menu_category_id,
      categoryName: p.category_name,
      price: getProductPrice(p),
      photo: getPosterPhotoUrl(p.photo),
      outOfStock: p.out > 0,
    }))
    .filter((p) => p.price > 0)
    .sort((a, b) => a.name.localeCompare(b.name, "uk"));
}

export async function getMenu(): Promise<{
  categories: MenuCategory[];
  products: MenuItem[];
}> {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  // Only return categories that have products
  const categoryIds = new Set(products.map((p) => p.categoryId));
  const filteredCategories = categories.filter((c) => categoryIds.has(c.id));
  return { categories: filteredCategories, products };
}
