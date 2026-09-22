import { useState } from 'react';
import { Table, Tag, Image, Button, Form, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useBrands from '../hooks/useBrands';
import useCreateBrand from '../hooks/useCreateBrand';
import useUpdateBrand from '../hooks/useUpdateBrand';
import useDeleteBrand from '../hooks/useDeleteBrand';
import BrandModal from './BrandModal';


export default function Brand() {
  const { data, isLoading, isFetching, isError, refetch } = useBrands();
  const { mutate: createBrand, isPending: isCreating } = useCreateBrand();
  const { mutate: updateBrand, isPending: isUpdating } = useUpdateBrand();
  const { mutate: deleteBrand, isPending: isDeleting, deletingId } = useDeleteBrand();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [form] = Form.useForm();

  const logo = Form.useWatch('logo', form);

  const showModal = (brand: any = null) => {
    setEditingBrand(brand);
    if (brand) {
      form.setFieldsValue({
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo: brand.logo,
        isActive: brand.isActive ?? true,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description ?? '',
      logo: values.logo,
      isActive: values.isActive ?? true,
    };

    const onSuccess = () => {
      setIsModalOpen(false);
      setEditingBrand(null);
      form.resetFields();
    };

    if (editingBrand) {
      updateBrand({ id: editingBrand.id, ...payload }, { onSuccess });
    } else {
      createBrand(payload, { onSuccess });
    }
  };

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      width: 110,
      render: (logoUrl: string) => (
        <div className="w-[70px] h-[46px] rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden dark:border-slate-700 dark:bg-slate-900/50">
          <Image
            width={62}
            height={38}
            src={logoUrl || 'https://placehold.co/200x80?text=No+Image'}
            fallback="https://placehold.co/200x80?text=No+Image"
            alt="Brand Logo"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800 dark:text-white">{text}</span>
          <span className="text-xs font-mono text-gray-400 dark:text-slate-400">/{record.slug}</span>
        </div>
      ),
    },
    {
      title: 'Tavsifi',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <span className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">{text || '—'}</span>
      ),
    },
    {
      title: 'Mahsulotlar soni',
      dataIndex: ['_count', 'products'],
      key: 'productsCount',
      width: 150,
      render: (count: number) => (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4EA674]/10 px-2.5 py-1 text-xs font-medium text-[#4EA674]">
          <i className="bi bi-box-seam" />
          {count ?? 0} ta
        </span>
      ),
    },
    {
      title: 'Holati',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 120,
      render: (isActive: boolean) => (
        <Tag
          color={isActive ? 'success' : 'error'}
          className="rounded-full px-2.5 border-none"
        >
          {isActive ? 'Faol' : 'Nofaol'}
        </Tag>
      ),
    },
    {
      title: 'Yaratilgan sana',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => (
        <span className="text-xs text-gray-500 dark:text-slate-400">
          {date ? new Date(date).toLocaleDateString('uz-UZ') : '-'}
        </span>
      ),
    },
    {
      title: 'Amallar',
      key: 'actions',
      width: 110,
      render: (_: unknown, record: any) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Tahrirlash">
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => showModal(record)}
              className="text-gray-500! hover:text-[#4EA674]! dark:text-slate-300!"
            />
          </Tooltip>
          <Popconfirm
            title="Brendni o'chirish"
            description="Rostdan ham ushbu brendni o'chirmoqchimisiz?"
            onConfirm={() => deleteBrand(record.id)}
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{ danger: true, loading: isDeleting }}
          >
            <Tooltip title="O'chirish">
              <Button
                type="text"
                shape="circle"
                danger
                loading={isDeleting && deletingId === record.id}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-5 space-y-5 overflow-y-auto h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center text-lg">
              <i className="bi bi-award" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Brands List</h2>
              <p className="text-xs text-gray-400 dark:text-slate-400">
                Do'kondagi barcha brendlarni boshqaring
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showModal()}
            className="inline-flex items-center gap-2 rounded-full bg-[#4EA674] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#3d8b5f]"
          >
            <i className="bi bi-plus-lg" /> Add Brand
          </button>
        </div>

        {isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-500/30 dark:bg-rose-500/10">
            <i className="bi bi-exclamation-triangle text-2xl text-rose-500" />
            <p className="mt-2 text-sm font-medium text-rose-600 dark:text-rose-300">
              Brendlarni yuklab bo'lmadi
            </p>
            <Button className="mt-4" shape="round" onClick={() => refetch()}>
              Qayta urinish
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={data?.data}
                loading={isLoading || isFetching}
                rowKey="id"
                pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
                scroll={{ x: 900 }}
              />
            </div>
          </div>
        )}

      </div>
      <BrandModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        editingBrand={editingBrand}
        form={form}
        logo={logo}
        handleFinish={handleFinish}
        isPending={isCreating || isUpdating}
      />
    </>
  );
}
