import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CreateProductModel, ProductModel } from '../../services/products';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-add-product',
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
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    inStock: [false, Validators.required],
    categoryId: [0, Validators.required],
    description: ['', Validators.maxLength(3000)],
    image: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private service: ProductsService) { }

  submit(): void {

    if (!this.form.valid) {
      alert("Invalid data, please try again!");
      return;
    }

    const item: CreateProductModel = this.form.value as CreateProductModel;
    this.service.create(item).subscribe(res => {
      console.log(res);
    });
  }

  onImagePicked(event: any) {
    //const target = (event.target as HTMLInputElement);
    const file = event.target.files[0]; // Here we use only the first file (single file)
    this.form.patchValue({ image: file });
  }
}
