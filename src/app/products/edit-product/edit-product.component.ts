import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModel, ProductModel } from '../../services/products';
import { ProductsService } from '../../services/products.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductFormComponent } from "../product-form/product-form.component";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
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
export class EditProductComponent implements OnInit {

  id: number = 0;
  product: ProductModel | null = null;

  constructor(
    private service: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.get(this.id).subscribe(res => {
      this.product = res;
    });
  }

  back(): void {
    this.location.back();
  }

  edit(model: any): void {
    if (!this.product) return;

    const item: ProductModel = model as ProductModel;
    item.id = this.id;
    item.imageUrl = this.product.imageUrl;

    this.service.edit(item).subscribe(() => this.back());
  }
}
