import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    inStock: [false, Validators.required],
    categoryId: [0, Validators.required],
    description: ['', Validators.maxLength(3000)]
  });

  @Output()
  onSubmit = new EventEmitter<any>();

  @Input() product: ProductModel | null = null;
  categories: CategoryModel[] = [];

  constructor(private fb: FormBuilder,
    private service: ProductsService,
    private location: Location) { }

  ngOnInit(): void {
    this.service.getCategories().subscribe(res => this.categories = res);
  }

  submit(): void {

    if (!this.form.valid) {
      alert("Invalid data, please try again!");
      return;
    }

    // transfer data to parent component
    this.onSubmit.emit(this.form.value);
  }

  back(): void {
    this.location.back();
  }

  onCancel() {
    if (this.product)
      this.form.setValue(this.product);
  }
}
