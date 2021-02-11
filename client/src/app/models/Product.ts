export class Product {
  constructor(
    public title: string = 'Ürün Yükleniyor...',
    public type: string = 'Ürün Türü Yükleniyor...',
    public description: string = 'Açıklama Yükleniyor...',
    public price: number | string = 'Fiyat Yükleniyor...',
    public rating: number | string = 'Derece Yükleniyor...',
    public filename: string = 'Yukleniyor.jpg'
  ) {}
}
