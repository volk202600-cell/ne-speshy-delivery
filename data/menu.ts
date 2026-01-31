export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const menu: MenuItem[] = [
  {
    id: "burger-classic",
    name: "Бургер Класік",
    price: 120,
    description: "Яловичина, сир, салат, соус",
    image: "/burger1.jpg",
  },
  {
    id: "burger-bbq",
    name: "Бургер BBQ",
    price: 140,
    description: "BBQ соус, бекон, сир",
    image: "/burger2.jpg",
  },
];
