import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  kategori: string = '';
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((routeParams) => {
      this.kategori = routeParams['kategori'];
      this.productService
        .getProductsByType(routeParams['kategori'])
        .subscribe((res) => {
          this.products = res;
        });
    });
  }
}
