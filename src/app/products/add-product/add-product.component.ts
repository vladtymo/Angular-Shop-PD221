import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModel, CreateProductModel, ProductModel } from '../../services/products';
import { ProductsService } from '../../services/products.service';
import { Location } from '@angular/common';
import { ProductFormComponent } from "../product-form/product-form.component";

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ProductFormComponent
  ]
})
export class AddProductComponent {

  image: File | null = null;

  constructor(
    private service: ProductsService,
    private location: Location) { }

  create(data: any): void {
    const item: CreateProductModel = data as CreateProductModel;
    item.image = this.image;

    this.service.create(item).subscribe(res => {
      console.log(res);

      this.back();
    });
  }

  back(): void {
    this.location.back();
  }

  onImagePicked(event: any) {
    //const target = (event.target as HTMLInputElement);
    const file = event.target.files[0]; // Here we use only the first file (single file)
    this.image = file;
  }
}
