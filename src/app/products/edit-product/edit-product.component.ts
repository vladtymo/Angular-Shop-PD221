import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ProductModel } from '../../services/products';
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
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    inStock: [false, Validators.required],
    categoryId: [0, Validators.required],
    description: ['', Validators.maxLength(3000)]
  });

  id: number = 0;
  product: ProductModel | null = null;

  constructor(private fb: FormBuilder,
    private service: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? "0");
    this.service.get(this.id).subscribe(res => {
      this.product = res;

      this.form.setValue({
        name: res.name,
        price: res.price,
        discount: res.discount,
        inStock: false,
        categoryId: 3,
        description: res.description
      });
    });
  }

  back(): void {
    this.location.back();
  }

  submit(): void {

    if (!this.form.valid) {
      alert("Invalid data, please try again!");
      return;
    }

    const item: ProductModel = this.form.value as ProductModel;
    this.service.edit(item);
  }
}
