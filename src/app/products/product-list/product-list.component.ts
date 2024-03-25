import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductModel } from '../../services/products';
import { ProductsService } from '../../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RemoveProductDialogComponent } from '../remove-product-dialog/remove-product-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'rating', 'actions'];
  dataSource: ProductModel[] = [];

  constructor(private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    // get data from the server
    this.productsService.getAll().subscribe(res => this.dataSource = res.products);
  }

  deleteHandler(id: number): void {
    this.openDeleteDialog().afterClosed().subscribe(res => {
      if (res === true) this.productsService.delete(id);
    });
  }

  editHandler(id: number): void {
    this.router.navigate(['/edit-product', id]);
  }

  openDeleteDialog() {
    return this.dialog.open(RemoveProductDialogComponent)
  }
}
