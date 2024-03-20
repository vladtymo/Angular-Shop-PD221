import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductModel } from '../services/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'rating'];
  dataSource: ProductModel[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    // get data from the server
    this.productsService.getAll().subscribe(res => this.dataSource = res.products);
  }
}
