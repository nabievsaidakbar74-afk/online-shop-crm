import { useMemo, useState } from "react"
import useCategories from "../hooks/useCategories"
import useDeleteCategory from "../hooks/useDeleteCategory"
import { Button, Popconfirm, Space, Table } from "antd"
import { useSelector } from "react-redux"
import CategoryModal from "./CategoryModal"
import type { CategoryType } from "../types/categories"
import { useNavigate } from "react-router-dom"

function CategoryThumb({ src, className }: { src?: string | null; className: string }) {
  if (!src) {
    return (
      <span className={`${className} bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400`}>
        <i className="bi bi-image" />
      </span>
    )
  }
  return (
    <img
      src={src}
      alt=""
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = "none"
        e.currentTarget.parentElement?.classList.add("bg-gray-100")
      }}
    />
  )
}

export default function Categori() {
  const navigate = useNavigate()
  const { data, isLoading } = useCategories()
  const { mutate, isPending, variables } = useDeleteCategory()
  const [activeTab, setActiveTab] = useState<"all" | "active" | "hidden">("all")
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark)

  const categories: CategoryType[] = data?.data ?? []

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return categories.filter((c) => {
      const matchSearch =
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.slug?.toLowerCase().includes(q)
      if (activeTab === "active") return matchSearch && c.isActive
      if (activeTab === "hidden") return matchSearch && !c.isActive
      return matchSearch
    })
  }, [categories, search, activeTab])

  const tabs = [
    { key: "all" as const, label: `All (${categories.length})` },
    { key: "active" as const, label: `Active (${categories.filter((c) => c.isActive).length})` },
    { key: "hidden" as const, label: `Hidden (${categories.filter((c) => !c.isActive).length})` },
  ]

  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (name: string, item: CategoryType) => (
        <div className="flex items-center gap-2">
          <CategoryThumb src={item.image} className="w-8 h-8 rounded-md object-cover shrink-0" />
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
      render: (_: unknown, item: CategoryType) => (
        <Space>
          <Button
            type="text"
            className={isDark ? "text-gray-300!" : "text-gray-500!"}
            icon={<i className="bi bi-pencil" />}
            onClick={() => navigate(`/categori/${item?.id}`)}
          />
          <Popconfirm
            title="Delete category?"
            description="This action cannot be undone."
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => mutate(item.id)}
          >
            <Button
              type="text"
              danger
              loading={isPending && variables === item.id}
              icon={<i className="bi bi-trash" />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-5 space-y-4 bg-[#F3F4F6] dark:bg-slate-900 overflow-y-auto h-[calc(100vh-6rem)] ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#4EA674] text-white text-sm px-4 py-2 hover:bg-[#3d8b5f] transition-colors"
        >
          <i className="bi bi-plus-lg"></i> Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.slice(0, 8).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/categori/${item.id}`)}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-3 min-h-27.5 border border-transparent hover:border-[#4EA674] transition-colors"
          >
            <CategoryThumb src={item.image} className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-sm text-gray-700 dark:text-gray-200 text-center line-clamp-1">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-1 border-b-2 transition-colors ${activeTab === tab.key
                  ? "border-[#4EA674] text-gray-900 dark:text-white font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-600 px-3 py-1.5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category"
              className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400 w-40"
            />
            <i className="bi bi-search text-gray-400 text-sm"></i>
          </div>
        </div>

        <Table<CategoryType>
          rowKey="id"
          loading={isLoading}
          columns={columns}
          dataSource={filtered}
          rowSelection={{}}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          className={isDark ? "[&_.ant-table]:bg-slate-800 [&_.ant-table-cell]:border-slate-700" : ""}
        />
        <CategoryModal open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
