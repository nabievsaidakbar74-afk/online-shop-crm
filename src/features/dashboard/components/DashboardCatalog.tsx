import { Link } from "react-router-dom"
import useCategories from "../../categories/hooks/useCategories"
import useProducts from "../../products/hooks/useProducts"
import type { CategoryType } from "../../categories/types/categories"

type ProductRow = {
  id: string
  name: string
  price?: number
  image?: string | null
  images?: Array<{ url?: string; isMain?: boolean }>
}

const fallbackCategories: Pick<CategoryType, "id" | "name" | "image">[] = [
  { id: "apple", name: "Apple", image: null },
  { id: "laptops", name: "Laptops", image: null },
  { id: "monitors", name: "Monitors", image: null },
  { id: "ps", name: "PS Components", image: null },
]

const fallbackProducts: ProductRow[] = [
  {
    id: "ee427b3f-8c7c-4c95-adc1-c09a27a98af4",
    name: "iphone 18 pro max",
    price: 1800,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXn1WSrma3GvyhMu_tAa1mf-1rYBSdbjVNMU8N1FIovw&s=10",
  },
  {
    id: "6fc61ec8-e95f-4484-9f42-63d46d710a91",
    name: "Quloqchin",
    price: 500000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgeSxI0uXMCRa4iKIuMRp3QuLcUuFgPW9-efI95xJobA&s=10",
  },
  {
    id: "d351bc14-c479-4d1c-b20c-583b683007db",
    name: "Samsung Galaxy S26 Ultra pro max",
    price: 16552304,
    image: null,
  },
  {
    id: "2e0b3463-7b02-4eb1-a33e-91aafaadaf1a",
    name: "iphone 14 pro max",
    price: 3,
    image: "https://cdn.asaxiy.uz/asaxiy-content/product/items/desktop/70efdf2ec9b086079795c442636b55fb2025091822515417719tz7UfvEoNg.jpg.webp",
  },
]

function formatPrice(value?: number | null) {
  return `${Number(value ?? 0).toLocaleString("en-US")} so'm`
}

function categoryIcon(name: string) {
  const label = name.toLowerCase()
  if (label.includes("phone") || label.includes("apple")) return "bi-apple"
  if (label.includes("laptop")) return "bi-laptop"
  if (label.includes("monitor") || label.includes("display")) return "bi-display"
  if (label.includes("component") || label.includes("ps") || label.includes("game")) return "bi-controller"
  if (label.includes("watch")) return "bi-smartwatch"
  if (label.includes("head") || label.includes("audio")) return "bi-headphones"
  if (label.includes("camera")) return "bi-camera"
  return "bi-grid"
}

function productImage(product: ProductRow) {
  return product.images?.find((image) => image.isMain)?.url || product.images?.[0]?.url || product.image || null
}

function Thumb({ src, alt, icon }: { src?: string | null; alt: string; icon?: string }) {
  if (src) {
    return <img src={src} alt={alt} className="h-9 w-9 shrink-0 rounded-lg bg-canvas object-cover" />
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-faint">
      <i className={`bi ${icon || "bi-image"} text-sm`} />
    </span>
  )
}

function RowsSkeleton() {
  return (
    <div className="space-y-2">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="skeleton h-12" />
      ))}
    </div>
  )
}

export default function DashboardCatalog() {
  const { data: categoriesRes, isLoading: categoriesLoading } = useCategories()
  const { data: productsRes, isLoading: productsLoading } = useProducts()

  const liveCategories: CategoryType[] = categoriesRes?.data ?? []
  const liveProducts: ProductRow[] = Array.isArray(productsRes) ? productsRes : productsRes?.data ?? []
  const usingFallbackCategories = !categoriesLoading && liveCategories.length === 0
  const usingFallbackProducts = !productsLoading && liveProducts.length === 0
  const categories = usingFallbackCategories ? fallbackCategories : liveCategories
  const products = usingFallbackProducts ? fallbackProducts : liveProducts

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <section className="surface flex min-h-[320px] flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold tracking-[-0.02em] text-ink">Quick Add Categories</h2>
          <Link to="/categori" className="text-sm font-semibold text-faint transition-colors hover:text-brand">
            All
          </Link>
        </div>

        {categoriesLoading ? (
          <RowsSkeleton />
        ) : (
          <div className="rail -mr-1 max-h-[280px] space-y-1 overflow-y-auto pr-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={usingFallbackCategories ? "/categori" : `/categori/${category.id}`}
                className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-brand-soft"
              >
                <Thumb src={category.image} alt={category.name} icon={categoryIcon(category.name)} />
                <span className="truncate text-sm font-semibold text-ink">{category.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="surface flex min-h-[320px] flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-bold tracking-[-0.02em] text-ink">Quick Add Products</h2>
          <Link to="/product" className="btn-add">
            <i className="bi bi-plus" />
            New
          </Link>
        </div>

        {productsLoading ? (
          <RowsSkeleton />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-box-seam" />
            <p className="text-sm font-semibold text-ink">Mahsulotlar topilmadi</p>
          </div>
        ) : (
          <div className="rail -mr-1 max-h-[280px] space-y-1 overflow-y-auto pr-1">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-3 rounded-xl px-2 py-2">
                <Thumb src={productImage(product)} alt={product.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                  <p className="text-xs text-faint">{formatPrice(product.price)}</p>
                </div>
                <Link to={usingFallbackProducts ? "/product" : `/product/${product.id}`} className="btn-add">
                  Add
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
