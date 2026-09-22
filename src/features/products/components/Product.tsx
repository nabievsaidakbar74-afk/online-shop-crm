import { Table, Tag, Image, Space, Button, Tooltip, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useProducts from '../hooks/useProducts'
import { useState } from 'react'
import ProductDrawer from './ProductDrawer'
import useDeleteProducts from '../hooks/useDeleteProducts'
import { useNavigate } from 'react-router-dom'

interface ProductType {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  sku: string
  barcode: string
  price: number
  oldPrice: number
  discountPercent: number
  stock: number
  reservedStock: number
  availableStock: number
  lowStockThreshold: number
  brandId: string
  categoryId: string
  isActive: boolean
  isFeatured: boolean
  isNew: boolean
  isPopular: boolean
  viewsCount: number
  createdAt: string
  updatedAt: string
  brand?: {
    id: string
    name: string
    logo: string
  }
  category?: {
    id: string
    name: string
  }
  images?: Array<{
    id: string
    url: string
    alt: string
    isMain: boolean
  }>
  variants: Array<any>
  averageRating: number
  reviewsCount: number
}

export default function Product() {

const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const { mutate } = useDeleteProducts()


  const { data, isLoading } = useProducts()


  const handleDelete = (id: string) => {
    mutate(id)
  }

  const productsList = Array.isArray(data) ? data : data?.data ?? []

  const columns: ColumnsType<ProductType> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const mainImage = record.images?.find((img) => img.isMain) || record.images?.[0]
        return (
          <div className="flex items-center gap-3">
            <Image
              src={mainImage?.url}
              alt={record.name}
              width={48}
              height={48}
              className="rounded-lg object-cover border border-gray-100 dark:border-slate-700"
              fallback="https://placehold.co/100x100?text=No+Image"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm line-clamp-1">{record.name}</span>
              <span className="text-xs text-gray-400 font-mono">SKU: {record.sku}</span>
            </div>
          </div>
        )
      },
    },
    {
      title: "Category & Brand",
      key: "category_brand",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {record.category?.name || "-"}
          </span>
          <Tag color="blue" className="w-fit border-none text-[10px] font-medium">
            {record.brand?.name || "-"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm text-[#4EA674]">
            {price?.toLocaleString() ?? 0} UZS
          </span>
          {record.discountPercent > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 line-through">
                {record.oldPrice?.toLocaleString()} UZS
              </span>
              <Tag color="red" className="text-[10px] px-1 py-0 border-none">
                -{record.discountPercent}%
              </Tag>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "availableStock",
      key: "stock",
      render: (availableStock, record) => {
        const isLowStock = availableStock <= record.lowStockThreshold
        return (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium">
              Available: <span className="font-bold">{availableStock ?? 0}</span>
            </span>
            {isLowStock ? (
              <Tag color="warning" className="w-fit text-[10px]">
                Low Stock ({record.stock})
              </Tag>
            ) : (
              <span className="text-[11px] text-gray-400">Total: {record.stock}</span>
            )}
          </div>
        )
      },
    },
    {
      title: "Badges",
      key: "badges",
      render: (_, record) => (
        <Space size={[0, 4]} wrap>
          {record.isNew && <Tag color="green">New</Tag>}
          {record.isPopular && <Tag color="purple">Popular</Tag>}
          {record.isFeatured && <Tag color="gold">Featured</Tag>}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "default"} className="rounded-full px-2.5">
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {/* Edit Icon Button */}
          <Tooltip title="Edit Product">
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined className="text-base text-blue-600 hover:text-blue-700" />}
              onClick={() => navigate(record.id)}
              className="flex items-center justify-center hover:bg-blue-50 active:scale-95 transition-all duration-200"
            />
          </Tooltip>

          {/* Delete Icon Button with Confirmation */}
          <Popconfirm
            title="Delete the product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Product">
              <Button
                type="text"
                shape="circle"
                danger
                icon={<DeleteOutlined className="text-base text-red-500 hover:text-red-600" />}
                className="flex items-center justify-center hover:bg-red-50 active:scale-95 transition-all duration-200"
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ]
  return (
    <div className="p-5 space-y-5 overflow-y-auto h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center text-lg">
            <i className="bi bi-box-seam" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Products List</h1>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Manage and view all your store products
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(state => !state)}
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#4EA674] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#3d8b5f]"
        >
          <i className="bi bi-plus-lg" /> Add Product
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={productsList}
            loading={isLoading}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: false }}
            scroll={{ x: 950 }}
          />
          <ProductDrawer open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  )
}