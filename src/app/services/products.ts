export interface ProductModel {
    id: number;
    name: string;
    categoryId: number;
    discount: number;
    price: number;
}

export interface ProductResponseModel {
    products: ProductModel[];
    limit: number;
    skip: number;
    total: number;
}