import { Table, Tag, Button, Space, Avatar } from "antd"
import type { ColumnsType } from "antd/es/table"
import { MessageOutlined, DeleteOutlined, UserOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons"
import useCustomer from "../hooks/useCustomer"
import useUpdateCustomers from "../hooks/useUpdateCustomers"

type CustomerRow = {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  avatar?: string
  totalOrders?: number
  totalSpent?: number
  isActive?: boolean
  _count?: { orders?: number }
}

export default function Customer() {

  const { isPending, mutate } = useUpdateCustomers()


  const { data, isLoading } = useCustomer()
  const customers = Array.isArray(data?.data) ? data.data : []

  console.log(customers?.isActive)



  const columns: ColumnsType<CustomerRow> = [
    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (id) => (
        <span className="text-gray-700 dark:text-gray-200 font-mono">
          #{id?.slice(0, 8)}
        </span>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      width: 240,
      ellipsis: true,
      render: (_, record) => (
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            className="bg-[#4EA674] shrink-0"
          >
            {!record.avatar && `${record.firstName?.[0] || ""}${record.lastName?.[0] || ""}`}
          </Avatar>
          <div className="min-w-0 flex flex-col">
            <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
              {record.firstName} {record.lastName}
            </span>
            <span className="text-xs text-gray-400 truncate">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      ellipsis: true,
      render: (phone) => (
        <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{phone || "—"}</span>
      ),
    },
    {
      title: "Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
      width: 100,
      render: (orders, record) => (
        <span className="text-gray-500 dark:text-gray-400">
          {orders ?? record._count?.orders ?? 0}
        </span>
      ),
    },
    {
      title: "Total Spend",
      dataIndex: "totalSpent",
      key: "totalSpent",
      width: 140,
      render: (spent) => (
        <span className="text-gray-700 dark:text-gray-200 whitespace-nowrap">
          {Number(spent ?? 0).toLocaleString()} UZS
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 110,
      render: (isActive) => (
        <Tag
          color={isActive ? "green" : "default"}
          className="rounded-full px-3 py-0.5 border-none inline-flex items-center gap-1.5 text-xs m-0"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`} />
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 90,
      fixed: "right",
      render: (_, record) => (
        <Space size={4}>
          <Button
            onClick={() => mutate({ id: record.id, isActive: !record.isActive })}
            type="text"
            icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />}
            className="text-gray-400 hover:text-[#4EA674]! p-0 border-none shadow-none"
          />

        </Space>
      ),
    },
  ]

  return (
    <div className="p-5 space-y-5 overflow-y-auto overflow-x-hidden h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center text-lg">
            <i className="bi bi-people" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Customers</h1>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Do'kondagi barcha mijozlarni boshqaring
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none min-w-0">
        <Table
          columns={columns}
          dataSource={customers}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
          scroll={{ x: 900 }}
        />
      </div>
    </div>
  )
}
