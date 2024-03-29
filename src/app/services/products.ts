export interface ProductModel {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    discount: number;
    price: number;
    description: string | null;
    inStock: boolean;
    imageUrl: string;
}

export interface CreateProductModel {
    name: string;
    categoryId: number;
    discount: number;
    price: number;
    description: string | null;
    inStock: boolean;
    image: File | null;
}

// Dummy JSON
// export interface ProductModel {
//     id: number;
//     title: string;
//     categoryId: number;
//     discountPercentage: number;
//     price: number;
//     description: string;
// }

export interface ProductResponseModel {
    products: ProductModel[];
    limit: number;
    skip: number;
    total: number;
}