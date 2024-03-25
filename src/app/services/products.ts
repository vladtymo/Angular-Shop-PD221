export interface ProductModel {
    id: number;
    title: string;
    categoryId: number;
    discountPercentage: number;
    price: number;
    description: string;
}

export interface ProductResponseModel {
    products: ProductModel[];
    limit: number;
    skip: number;
    total: number;
}