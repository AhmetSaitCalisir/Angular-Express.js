import { Options, LabelType } from 'ng5-slider';

export class MoneySlider {
  constructor(
    public minValue: number = 0,
    public maxValue: number = 400,
    public options: Options = {
      floor: 0,
      ceil: 650,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return (
              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-bottom" viewBox="0 0 16 16">
              <rect width="4" height="12" x="6" y="1" rx="1"/>
              <path d="M1.5 14a.5.5 0 0 0 0 1v-1zm13 1a.5.5 0 0 0 0-1v1zm-13 0h13v-1h-13v1z"/>
            </svg></b> ₺` + value
            );
          case LabelType.High:
            return (
              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-top" viewBox="0 0 16 16">
              <rect width="4" height="12" rx="1" transform="matrix(1 0 0 -1 6 15)"/>
              <path d="M1.5 2a.5.5 0 0 1 0-1v1zm13-1a.5.5 0 0 1 0 1V1zm-13 0h13v1h-13V1z"/>
            </svg></> ₺` + value
            );
          default:
            return '';
        }
      },
    }
  ) {}
}

export class StarSlider {
  constructor(
    public minValue: number = 0,
    public maxValue: number = 5,
    public options: Options = {
      floor: 0,
      ceil: 5,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return (
              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>` + value
            );
          case LabelType.High:
            return (
              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>` + value
            );
          default:
            return '';
        }
      },
    }
  ) {}
}
