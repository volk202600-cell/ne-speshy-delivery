import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MenuWrapper } from "@/components/menu-wrapper"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { getMenu } from "@/lib/poster"

export default async function HomePage() {
  let categories: Awaited<ReturnType<typeof getMenu>>["categories"] = []
  let products: Awaited<ReturnType<typeof getMenu>>["products"] = []

  try {
    const menu = await getMenu()
    categories = menu.categories
    products = menu.products
  } catch (error) {
    console.error("Failed to load menu:", error)
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuWrapper categories={categories} products={products} />
        <AboutSection />
      </main>
      <Footer />
      <CartSidebar />
    </>
  )
}
