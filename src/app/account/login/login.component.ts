import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoginModel, RegisterModel } from '../account';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-login',
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
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;

  constructor(fb: FormBuilder,
    private service: AccountsService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  back() {

  }
  onSubmit() {
    if (!this.form.valid) {
      alert("Invalid data, please try again!");
      return;
    }

    const model: LoginModel = this.form.value as LoginModel;

    this.service.login(model).subscribe(res => {
      console.log(res);

      // TODO: navigate to home page
    });
  }

}
