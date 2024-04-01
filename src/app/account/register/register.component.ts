import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { RegisterModel } from '../account';
import { AccountsService } from '../../services/accounts.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    RouterLink,
    MatDatepickerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: FormGroup;

  constructor(fb: FormBuilder,
    private location: Location,
    private service: AccountsService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
      phone: [''],
      birthdate: [null, Validators.required]
    }, { validator: this.passwordConfirming });
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    if (!this.form.valid) {
      alert("Invalid data, please try again!");
      return;
    }

    const model: RegisterModel = this.form.value as RegisterModel;

    this.service.register(model).subscribe(res => {
      console.log(res);

      // TODO: navigate to home page
    });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } | null {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      return { invalid: true };
    }
    else return null;
  }
}
