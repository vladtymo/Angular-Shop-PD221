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


@Component({
  selector: 'app-edit-product',
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
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  form = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    inStock: [false, Validators.required],
    categoryId: [0, Validators.required],
    description: ['', Validators.maxLength(3000)],
    imageUrl: ['', Validators.required],
    categoryName: ['']
  });

  id: number = 0;
  product: ProductModel | null = null;
  categories: CategoryModel[] = [];

  constructor(private fb: FormBuilder,
    private service: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getCategories().subscribe(res => this.categories = res);

    this.service.get(this.id).subscribe(res => {
      this.product = res;
      this.form.setValue(this.product);
    });
  }

  back(): void {
    this.location.back();
  }

  submit(): void {
    ``
    if (!this.form.valid) {
      alert("Invalid data, please try again!");
      return;
    }

    const item: ProductModel = this.form.value as ProductModel;
    this.service.edit(item).subscribe(() => this.back());
  }

  onCancel() {
    if (this.product)
      this.form.setValue(this.product);
  }
}
