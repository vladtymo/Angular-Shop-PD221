import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['image', 'id', 'name', 'price', 'rating', 'actions'];
  products: ProductModel[] = [];
  tableSource = new MatTableDataSource<ProductModel>([]);

  constructor(private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    // get data from the server
    this.productsService.getAll().subscribe(res => {
      this.products = res;
      this.updateTableSource();
    });
  }

  deleteHandler(id: number) {
    this.openDeleteDialog().afterClosed().subscribe(async res => {
      if (res === true) {
        await lastValueFrom(this.productsService.delete(id));
        // TODO: show alert
        const index = this.products.findIndex(x => x.id === id);
        this.products.splice(index, 1);
        this.updateTableSource();
      }
    });
  }

  editHandler(id: number): void {
    this.router.navigate(['/edit-product', id]);
  }

  openDeleteDialog() {
    return this.dialog.open(RemoveProductDialogComponent)
  }

  updateTableSource() {
    this.tableSource.data = this.products;
  }
}
