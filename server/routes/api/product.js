const express = require("express");

const router = express.Router();

const validation = require("./validation");
const filter = require("./filter");

let dataBase = require("../../database/product.json");

//Tüm ürünlerin listelenmesi
router.get("/", (req, res) => {
  console.log("----");
  const filters = {
    tamFiyat: req.query.priceE,
    altFiyat: req.query.priceL,
    ustFiyat: req.query.priceH,
    tamDerece: req.query.ratingE,
    altDerece: req.query.ratingL,
    ustDerece: req.query.ratingH,
    type: false,
  };
  console.log("Tüm ürünler listelendi");
  res.json(filter.fullFilter(dataBase, filters));
});

//Bir ürün listelenmesi
router.get("/title/:title", (req, res) => {
  console.log("----");
  if (validation.productExist(dataBase, req.params.title, "title")) {
    console.log(`${req.params.title} başlıklı ürünler listelendi`);
    res.json(
      dataBase.filter((product) => {
        return product.title === req.params.title;
      })
    );
  } else {
    res
      .status(400)
      .send(`${req.params.title} Title'lı bir ürün bulunmamaktatır`);
  }
});

//Kategorili Ürünlerin listelenmesi
router.get("/type/:type", (req, res) => {
  console.log("----");
  if (validation.productExist(dataBase, req.params.type, "type")) {
    const filters = {
      tamFiyat: req.query.priceE,
      altFiyat: req.query.priceL,
      ustFiyat: req.query.priceH,
      tamDerece: req.query.ratingE,
      altDerece: req.query.ratingL,
      ustDerece: req.query.ratingH,
      type: req.params.type,
    };
    console.log(`${req.params.type} tip ürünler listelendi`);
    res.json(filter.fullFilter(dataBase, filters));
  } else {
    res.status(400).send(`${req.params.type} tipinde ürün bulunmamaktadır`);
  }
});

//Kategori sınırları
router.get("/filter/:type", (req, res) => {
  const db = dataBase.filter((v) => {
    return v.type === req.params.type;
  });
  let filterBorder = {
    HighPrice: -1,
    LowPrice: 999,
    HighStar: -1,
    LowStar: 999,
  };
  db.forEach((v) => {
    filterBorder.HighPrice =
      v.price > filterBorder.HighPrice ? v.price : filterBorder.HighPrice;
    filterBorder.LowPrice =
      v.price < filterBorder.LowPrice ? v.price : filterBorder.LowPrice;
    filterBorder.HighStar =
      v.rating > filterBorder.HighStar ? v.rating : filterBorder.HighStar;
    filterBorder.LowStar =
      v.rating < filterBorder.LowStar ? v.rating : filterBorder.LowStar;
  });
  res.json(filterBorder);
});

//Kategoriler
router.get("/type", (req, res) => {
  let types = [];
  dataBase.forEach((v) => {
    if (!types.includes(v.type)) {
      types.push(v.type);
    }
  });
  res.json(types);
});

//Ürün ekle
router.post("/", (req, res) => {
  console.log("----");
  if (!validation.productT_T_D(req.body.title)) {
    res
      .status(400)
      .send("Lütfen ürün ismini (title) doğru girdiğinizden emin olunuz");
    return;
  }
  if (!validation.productT_T_D(req.body.type)) {
    res
      .status(400)
      .send("Lütfen ürün tipini (type) doğru girdiğinizden emin olunuz");
    return;
  }
  if (!validation.productT_T_D(req.body.description)) {
    res
      .status(400)
      .send(
        "Lütfen ürün açıklamasını (description) doğru girdiğinizden emin olunuz"
      );
    return;
  }
  if (!validation.productPrice(req.body.price)) {
    res
      .status(400)
      .send("Lütfen ürün fiyatını (price) doğru girdiğinizden emin olunuz");
    return;
  }
  if (!validation.productRating(req.body.rating)) {
    res
      .status(400)
      .send(
        "Lütfen ürün derecelendirmesini (rating) doğru girdiğinizden emin olunuz"
      );
    return;
  }
  const product = {
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
  };
  dataBase.push(product);
  console.log(`${req.body.title} ürünü, veri tabanına eklendi`);
  res.status(200).send("Veri Başarıyla Eklendi");
});

//Ürün güncelle
router.put("/:title", (req, res) => {
  console.log("----");
  if (validation.productExist(dataBase, req.params.title, "title")) {
    const productIndex = dataBase.findIndex(
      (product) => product.title == req.params.title
    );
    let newDatabase = [...dataBase];
    newDatabase[productIndex].title = validation.productT_T_D(req.body.title)
      ? req.body.title
      : newDatabase[productIndex].title;
    newDatabase[productIndex].type = validation.productT_T_D(req.body.type)
      ? req.body.type
      : newDatabase[productIndex].type;
    newDatabase[productIndex].description = validation.productT_T_D(
      req.body.description
    )
      ? req.body.description
      : newDatabase[productIndex].description;
    newDatabase[productIndex].price = validation.productPrice(req.body.price)
      ? req.body.price
      : newDatabase[productIndex].price;
    newDatabase[productIndex].rating = validation.productRating(req.body.rating)
      ? req.body.rating
      : newDatabase[productIndex].rating;
    dataBase = newDatabase;
    console.log(`${req.params.title} isimli ürün güncellendi`);
    res.json(dataBase[productIndex]).status(200);
  } else {
    res.status(400).send(`${req.params.title} isimli ürün bulunmamaktadır`);
  }
});

//Ürün sil
router.delete("/:title", (req, res) => {
  console.log("----");
  if (validation.productExist(dataBase, req.params.title, "title")) {
    dataBase = dataBase.filter((product) => product.title != req.params.title);
    console.log(`${req.params.title} isimli ürün silindi`);
    res.status(200).send(`${req.params.title} isimli veri silindi`);
  } else {
    res.status(400).send(`${req.params.title} isimli ürün bulunmamaktadır`);
  }
});

module.exports = router;
