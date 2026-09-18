const inputCls =
  "w-full rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-[#4EA674]"

const labelCls = "text-sm text-gray-600 dark:text-gray-300 mb-2 block"

const cardCls = "bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-4"

const colors = ["#E8F5E9", "#F5EBE0", "#FFF8E1", "#2D2D2D"]

export default function ProductDetails() {
  return (
    <div className="p-5 space-y-4 bg-[#F3F4F6] dark:bg-slate-900 overflow-y-auto h-[calc(100vh-6rem)] ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Product</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2">
            <i className="bi bi-search text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search product to add"
              className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400 w-44"
            />
          </div>
          <button className="rounded-full bg-[#4EA674] text-white text-sm px-4 py-2 hover:bg-[#3d8b5f]">
            Publish Product
          </button>
          <button className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-gray-600 dark:text-gray-300 px-4 py-2">
            <i className="bi bi-plus-lg text-[#4EA674]"></i> Save to draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className={cardCls}>
            <p className="font-medium text-gray-900 dark:text-white">Basic Details</p>
            <div>
              <label className={labelCls}>Product Name</label>
              <input className={inputCls} defaultValue="iPhone 15" />
            </div>
            <div>
              <label className={labelCls}>Product Description</label>
              <div className="relative">
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-gray-800 dark:text-white outline-none focus:border-[#4EA674] resize-none"
                  defaultValue="The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminium."
                />
                <i className="bi bi-type text-gray-400 absolute right-4 bottom-3"></i>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <p className="font-medium text-gray-900 dark:text-white">Pricing</p>
            <div>
              <label className={labelCls}>Product Price</label>
              <div className="relative">
                <input className={inputCls} defaultValue="$999.89" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">🇺🇸</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Discounted Price (Optional)</label>
                <div className="flex gap-2">
                  <input className={`${inputCls} w-16 text-center`} defaultValue="$" />
                  <input className={inputCls} defaultValue="$900.89" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Tax Included</label>
                <div className="flex items-center gap-5 pt-2 text-sm text-gray-700 dark:text-gray-200">
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="tax" defaultChecked className="accent-[#4EA674]" /> Yes
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="tax" className="accent-[#4EA674]" /> No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <p className="font-medium text-gray-900 dark:text-white">Expiration</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Start</label>
                <div className="relative">
                  <input className={inputCls} placeholder="Start date" />
                  <i className="bi bi-calendar3 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
              <div>
                <label className={labelCls}>End</label>
                <div className="relative">
                  <input className={inputCls} placeholder="End date" />
                  <i className="bi bi-calendar3 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <p className="font-medium text-gray-900 dark:text-white">Inventory</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Stock Quantity</label>
                <select className={inputCls}>
                  <option>Unlimited</option>
                  <option>Limited</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Stock Status</label>
                <select className={inputCls}>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Unlimited</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-slate-600 rounded-full peer-checked:bg-[#4EA674] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input type="checkbox" defaultChecked className="accent-[#4EA674]" />
              Highlight this product in a featured section.
            </label>
            <div className="flex justify-center gap-3 pt-2">
              <button className="rounded-full border border-gray-200 dark:border-slate-600 px-5 py-2 text-sm text-gray-600 dark:text-gray-300">
                Save to draft
              </button>
              <button className="rounded-full bg-[#4EA674] text-white text-sm px-5 py-2 hover:bg-[#3d8b5f]">
                Publish Product
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={cardCls}>
            <p className="font-medium text-gray-900 dark:text-white">Upload Product Image</p>
            <div>
              <label className={labelCls}>Product Image</label>
              <div className="rounded-2xl border border-gray-100 dark:border-slate-600 bg-[#FAFAFA] dark:bg-slate-900/40 p-6 flex items-center justify-center min-h-55">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80"
                  alt="iPhone 15"
                  className="max-h-44 object-contain"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-3 px-1">
                <button className="hover:text-[#4EA674]"><i className="bi bi-image"></i> Browse</button>
                <button className="hover:text-[#4EA674]"><i className="bi bi-arrow-repeat"></i> Replace</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-900">
                <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&q=80" alt="" className="h-10 object-contain" />
              </div>
              <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-900">
                <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&q=80" alt="" className="h-10 object-contain" />
              </div>
              <button className="w-16 h-16 rounded-xl border border-dashed border-gray-300 dark:border-slate-500 text-[#4EA674] text-xs flex flex-col items-center justify-center gap-1">
                <i className="bi bi-plus-lg"></i>
                Add Image
              </button>
            </div>
          </div>

          <div className={cardCls}>
            <p className="font-medium text-gray-900 dark:text-white">Categories</p>
            <div>
              <label className={labelCls}>Product Categories</label>
              <select className={inputCls}>
                <option>Select your product</option>
                <option>Electronics</option>
                <option>Fashion</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Product Tag</label>
              <select className={inputCls}>
                <option>Select your product</option>
                <option>New</option>
                <option>Featured</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Select your color</label>
              <div className="flex items-center gap-3 pt-1">
                {colors.map((c) => (
                  <button
                    key={c}
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-600"
                    style={{ backgroundColor: c }}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
