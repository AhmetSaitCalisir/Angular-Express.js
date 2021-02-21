import { MoneySlider, StarSlider } from './../../models/Slider';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  moneySlider: MoneySlider = new MoneySlider();
  starSlider: StarSlider = new StarSlider();

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((routeParams) => {
      this.productService
        .getFilterBorder(routeParams['kategori'])
        .subscribe((res) => {
          this.moneySlider = new MoneySlider(res.LowPrice, res.HighPrice);
          this.starSlider = new StarSlider(res.LowStar, res.HighStar);
          this.moneySlider.maxValue = Math.ceil(res.HighPrice);
          this.moneySlider.minValue = Math.floor(res.LowPrice);
        });
    });
  }
}
