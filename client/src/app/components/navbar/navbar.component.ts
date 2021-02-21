import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  types: String[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getTypes().subscribe((res) => {
      this.types = res;
    });
  }
}
