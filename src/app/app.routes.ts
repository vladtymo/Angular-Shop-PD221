import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/products-list', pathMatch: 'full' },
    // { path: 'products-list', component: ProductListComponent },
    { path: 'products-list', component: ProductListComponent },
    { path: 'edit-product/:id', component: EditProductComponent, canActivate: [adminGuard] },
    { path: 'add-product', component: AddProductComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
