import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products-list', pathMatch: 'full' },
    // { path: 'products-list', component: ProductListComponent },
    { path: 'products-list', component: ProductListComponent },
    { path: 'edit-product/:id', component: EditProductComponent },
    { path: 'add-product', component: AddProductComponent },
];
