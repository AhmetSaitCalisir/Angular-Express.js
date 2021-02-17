import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();

  Arr = Array;

  star: boolean[] = [];

  imageUrl: string = '../../../assets/images/Yukleniyor.jpg';

  constructor() {}

  ngOnInit(): void {
    for (let index = 1; index < 6; index++) {
      if (index <= this.product.rating) {
        this.star.push(true);
      } else {
        this.star.push(false);
      }
    }
    this.imageUrl = `http://localhost:4545/ProductImages/${this.product.filename}`;
  }
}
