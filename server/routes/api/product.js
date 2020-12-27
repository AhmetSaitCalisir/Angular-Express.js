const express = require("express");
const uniqid = require("uniqid");

const router = express.Router();

let dataBase = require("../../database/product.json");

//Tüm ürünleri listele
router.get("/", (req, res) => {
  console.log("Tüm ürünler listelendi");
  res.json(dataBase);
});

//Title filtreli ürünlerin listelenmesi
router.get("/title/:title", (req, res) => {
  console.log(`${req.params.title} başlıklı ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.title === req.params.title;
    })
  );
});

//Tip filtreli ürünlerin listelenmesi
router.get("/type/:type", (req, res) => {
  console.log(`${req.params.title} tip ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.type === req.params.type;
    })
  );
});

//Derece Filtreli ürünlerin listelenmesi
//  Tam olarak derece
router.get("/rating/exact/:rating", (req, res) => {
  console.log(`${req.params.rating} dereceli ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.rating == req.params.rating;
    })
  );
});
//  Derecenin üstü
router.get("/rating/over/:rating", (req, res) => {
  console.log(`${req.params.rating} derecesinden yüksek ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.rating >= parseInt(req.params.rating);
    })
  );
});
//  Derecenin altı
router.get("/rating/below/:rating", (req, res) => {
  console.log(`${req.params.rating} derecesinden düşük ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.rating <= parseInt(req.params.rating);
    })
  );
});
//  Derecenin arası
router.get("/rating/between/:ratingH/:ratingL", (req, res) => {
  console.log(
    `${req.params.ratingH} derecesinden düşük ve ${req.params.ratingL} derecesinden yüksek ürünler listelendi`
  );
  res.json(
    dataBase.filter((product) => {
      return (
        product.rating <= parseInt(req.params.ratingH) &&
        product.rating >= parseInt(req.params.ratingL)
      );
    })
  );
});

//Fiyat Filtreli ürünlerin listelenmesi
//  Tam olarak fiyat
router.get("/price/exact/:price", (req, res) => {
  console.log(`${req.params.price} fiyatlı ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.price == req.params.price;
    })
  );
});
//  Fiyatın üstü
router.get("/price/over/:price", (req, res) => {
  console.log(`${req.params.price} fiyatından yüksek ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.price >= parseInt(req.params.price);
    })
  );
});
//  Fiyatın altı
router.get("/price/below/:price", (req, res) => {
  console.log(`${req.params.price} fiyatından düşük ürünler listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.price <= parseInt(req.params.price);
    })
  );
});
//  Fiyatlar arası
router.get("/price/between/:priceH/:priceL", (req, res) => {
  console.log(
    `${req.params.priceH} fiyatından düşük ve ${req.params.priceL} fiyatından yüksek ürünler listelendi`
  );
  res.json(
    dataBase.filter((product) => {
      return (
        product.price <= parseInt(req.params.priceH) &&
        product.price >= parseInt(req.params.priceL)
      );
    })
  );
});

//Ürün ekle
router.post("/", (req, res) => {
  const id = uniqid();
  const product = {
    id: id,
    title: req.body.title,
  };
  dataBase.push(product);
  console.log(
    `${product.title} ürünü ${product.id} id'siyle veri tabanına eklendi`
  );
  res.json(product).status(200);
});

//Ürün güncelle
router.put("/:id", (req, res) => {
  const productIndex = dataBase.findIndex(
    (product) => product.id == req.params.id
  );
  let newDatabase = [...dataBase];
  newDatabase[productIndex] = {
    ...newDatabase[productIndex],
    title: req.body.title,
  };
  dataBase = newDatabase;
  console.log(`${req.params.id} id'li ürün güncellendi`);
  res.json(dataBase).status(200);
});

//Ürün sil
router.delete("/:id", (req, res) => {
  dataBase = dataBase.filter((product) => product.id != req.params.id);
  console.log(`${req.params.id} id'li ürün silindi`);
  res.status(200).send(`${req.params.id} id'li veri silindi`);
});

module.exports = router;
