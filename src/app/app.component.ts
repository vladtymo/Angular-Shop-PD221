import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { AddProductComponent } from "./products/add-product/add-product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    AddProductComponent]
})
export class AppComponent {

}
