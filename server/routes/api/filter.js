module.exports = {
  priceFilter(veri, tamFiyat = false, altFiyat = false, ustFiyat = false) {
    if (tamFiyat) {
      console.log(`${tamFiyat}₺ ürünler filtreleniyor`);
      veri = veri.filter((v) => {
        return v.price == parseFloat(tamFiyat);
      });
    } else if (altFiyat && ustFiyat) {
      console.log(
        `${altFiyat}₺ ile ${ustFiyat}₺ arasındaki ürünler filtreleniyor`
      );
      veri = veri.filter((v) => {
        return (
          v.price >= parseFloat(altFiyat) && v.price <= parseFloat(ustFiyat)
        );
      });
    } else if (altFiyat) {
      console.log(`Minumum ${altFiyat}₺ ürünler filtreleniyor`);
      veri = veri.filter((v) => {
        return v.price >= parseFloat(altFiyat);
      });
    } else if (ustFiyat) {
      console.log(`Maksimum ${ustFiyat}₺ ürünler filtreleniyor`);
      veri = veri.filter((v) => {
        return v.price <= parseFloat(ustFiyat);
      });
    }
    return veri;
  },

  ratingFilter(veri, tamDerece = false, altDerece = false, ustDerece = false) {
    if (tamDerece) {
      console.log(`${tamDerece}★ ürünler filtreleniyor`);
      veri = veri.filter((v) => {
        return v.rating == parseFloat(tamDerece);
      });
    } else if (altDerece && ustDerece) {
      console.log(
        `${altDerece}★ ile ${ustDerece}★ arasındaki ürünler filtreleniyor`
      );
      veri = veri.filter((v) => {
        return (
          v.rating >= parseFloat(altDerece) && v.rating <= parseFloat(ustDerece)
        );
      });
    } else if (altDerece) {
      console.log(`Minumum ${altDerece}★ ürünler filtreleniyor`);
      veri = veri.filter((v) => {
        return v.rating >= parseFloat(altDerece);
      });
    } else if (ustDerece) {
      console.log(`Maksimum ${ustDerece}★ ürünler filtreleniyor`);
      veri = veri.filter((v) => {
        return v.rating <= parseFloat(ustDerece);
      });
    }
    return veri;
  },

  fullFilter(veri, filters) {
    return this.ratingFilter(
      this.priceFilter(
        veri,
        filters.tamFiyat,
        filters.altFiyat,
        filters.ustFiyat
      ),
      filters.tamDerece,
      filters.altDerece,
      filters.ustDerece
    ).filter((v) => {
      if (filters.type) {
        return v.type === filters.type;
      } else {
        return true;
      }
    });
  },
};
