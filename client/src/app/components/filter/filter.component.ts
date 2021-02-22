import { MoneySlider, StarSlider } from './../../models/Slider';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  //@Output() newItemEvent = new EventEmitter<string>();
  @Output() query = new EventEmitter<string>();

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
  /*deneme() {
    alert('çalışıo');
    this.newItemEvent.emit('Selam');
  }*/

  queryOlustur() {
    this.query.emit(
      `?priceL=${this.moneySlider.minValue}&priceH=${this.moneySlider.maxValue}&ratingL=${this.starSlider.minValue}&ratingH=${this.starSlider.maxValue}`
    );
  }
}
