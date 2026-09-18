export interface CategoryType {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    parentId: string | null;
    isActive: boolean;
    sortOrder: number;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    parent: CategoryType | null;
    children: CategoryType[];
    products: any[];
    _count: {
        products: number;
        children: number;
    };
};