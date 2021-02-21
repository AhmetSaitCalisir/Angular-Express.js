import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css'],
})
export class ProductItemsComponent implements OnInit {
  @Input() kategori: string = '';
  @Input() products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
