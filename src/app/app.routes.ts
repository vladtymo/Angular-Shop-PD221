import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products-list', pathMatch: 'full' },
    // { path: 'products-list', component: ProductListComponent },
    { path: 'products-list', component: ProductListComponent },
    { path: 'add-product', component: AddProductComponent },
];
