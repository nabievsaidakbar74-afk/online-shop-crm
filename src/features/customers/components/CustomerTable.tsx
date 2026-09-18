
import { Table, Tag, Button, Space, Avatar } from 'antd';
import { MessageOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

const CustomerTable = ({ data, isLoading }) => {
  console.log(data, isLoading)
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span className="text-gray-700 dark:text-gray-200">
          #{id.slice(0, 8)}
        </span>
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            className="bg-[#4EA674] shrink-0"
          >
            {!record.avatar && `${record.firstName?.[0] || ''}${record.lastName?.[0] || ''}`}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {record.firstName} {record.lastName}
            </span>
            <span className="text-xs text-gray-400">
              {record.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => <span className="text-gray-500 dark:text-gray-400">{phone}</span>,
    },
    {
      title: 'Order count',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (orders, record) => (
        <span className="text-gray-500 dark:text-gray-400">
          {orders ?? record._count?.orders ?? 0}
        </span>
      ),
    },
    {
      title: 'Total Spend',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (spent) => <span className="text-gray-700 dark:text-gray-200">${spent}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag
          color={isActive ? 'green' : 'default'}
          className="rounded-full px-3 py-0.5 border-none inline-flex items-center gap-1.5 text-xs"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button
            type="text"
            icon={<MessageOutlined />}
            className="text-gray-400 hover:text-[#4EA674]! p-0 border-none shadow-none"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-gray-400 hover:text-red-400! p-0 border-none shadow-none"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <Table
        columns={columns}
        dataSource={data?.data}
        rowKey="id"
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default CustomerTable;