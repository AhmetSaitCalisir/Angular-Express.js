import { MoneySlider, StarSlider } from './../../models/Slider';
import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  moneySlider: MoneySlider = new MoneySlider();
  starSlider: StarSlider = new StarSlider();

  constructor() {}

  ngOnInit(): void {}
}
