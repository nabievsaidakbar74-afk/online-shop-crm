import { useState } from "react"
import useCategories from "../hooks/useCategories"
import useDeleteCategory from "../hooks/useDeleteCategory"
import { Button, ConfigProvider, Space, Table, theme } from "antd"
import { useSelector } from "react-redux"
import CategoryModal from "./CategoryModal"
// import useCategoriesDetails from "../hooks/useCategoriesDetails"
import type { CategoryType } from "../types/categories"
import { useNavigate } from "react-router-dom"


const tabs = ["All Product (145)", "Featured Products", "On Sale", "Out of Stock"]

export default function Categori() {
  const navigate = useNavigate()


  const { data, isLoading } = useCategories()
  const { mutate, isPending } = useDeleteCategory()



  const [activeTab, setActiveTab] = useState("All Product (145)")
  const [open, setOpen] = useState(false)
  const isDark = useSelector((state) => state.theme.isDark)

  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (name: string, item: any) => (
        <div className="flex items-center gap-2">
          <img src={item.image} alt="" className="w-8 h-8 rounded-md object-cover" />
          <span className={isDark ? "text-gray-100" : "text-gray-800"}>{name}</span>
        </div>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => (value ? new Date(value).toLocaleDateString() : "-"),
    },
    {
      title: "Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, item: any) => (
        <Space>
          <Button
            type="text"
            className={isDark ? "text-gray-300!" : "text-gray-500!"}
            icon={<i className="bi bi-pencil" />}
            onClick={() => navigate(`/categori/${item?.id}`)}
          />
          <Button
            type="text"
            danger
            loading={isPending}
            icon={<i className="bi bi-trash" />}
            onClick={() => mutate(item.id)}
          />
        </Space>
      ),
    },
  ]
  return (
    <div className="p-5 space-y-4 bg-[#F3F4F6] dark:bg-slate-900 overflow-y-auto h-[calc(100vh-6rem)] ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Discover</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#4EA674] text-white text-sm px-4 py-2 hover:bg-[#3d8b5f] transition-colors"
          >
            <i className="bi bi-plus-lg"></i> Add Product
          </button>
          <button className="text-sm text-gray-500 dark:text-gray-300 hover:text-[#4EA674] transition-colors">
            More Action
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        </div>
        <button className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-700 shadow items-center justify-center text-gray-500 hover:text-[#4EA674]">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 border-b-2 transition-colors ${activeTab === tab
                  ? "border-[#4EA674] text-gray-900 dark:text-white font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-600 px-3 py-1.5">
              <input
                type="text"
                placeholder="Search your product"
                className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400 w-40"
              />
              <i className="bi bi-search text-gray-400 text-sm"></i>
            </div>
            <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-[#4EA674]">
              <i className="bi bi-funnel"></i>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-[#4EA674]">
              <i className="bi bi-plus-lg"></i>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 text-gray-400">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>




        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              colorPrimary: "#4EA674",
              colorBgContainer: isDark ? "#1e293b" : "#ffffff",
              colorText: isDark ? "#e5e7eb" : "#111827",
              colorTextSecondary: isDark ? "#94a3b8" : "#6b7280",
              colorBorder: isDark ? "#334155" : "#e5e7eb",
            },
            components: {
              Table: {
                headerBg: isDark ? "#334155" : "#F6FBF8",
                headerColor: isDark ? "#cbd5e1" : "#6b7280",
                rowHoverBg: isDark ? "#334155" : "#f9fafb",
                borderColor: isDark ? "#334155" : "#f3f4f6",
                colorBgContainer: isDark ? "#1e293b" : "#ffffff",
              },
              Pagination: {
                itemActiveBg: "#4EA674",
                colorText: isDark ? "#e5e7eb" : "#374151",
              },
            },
          }}
        >
          <Table<CategoryType>
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={data?.data ?? []}
            rowSelection={{}}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            className={isDark ? "[&_.ant-table]:bg-slate-800 [&_.ant-table-cell]:border-slate-700" : ""}
          />
          <CategoryModal open={open} setOpen={setOpen} />
        </ConfigProvider>

      </div>
    </div>
  )
}
