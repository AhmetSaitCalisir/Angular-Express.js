const express = require("express");

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
  if (!req.body.title || typeof req.body.title != "string") {
    res
      .status(400)
      .send("Lütfen ürün ismini (title) doğru girdiğinizden emin olunuz");
    return;
  }
  if (!req.body.type || typeof req.body.type != "string") {
    res
      .status(400)
      .send("Lütfen ürün tipini (type) doğru girdiğinizden emin olunuz");
    return;
  }
  if (!req.body.description || typeof req.body.description != "string") {
    res
      .status(400)
      .send(
        "Lütfen ürün açıklamasını (description) doğru girdiğinizden emin olunuz"
      );
    return;
  }
  if (
    !req.body.price ||
    typeof req.body.price != "number" ||
    req.body.price < 0
  ) {
    res
      .status(400)
      .send("Lütfen ürün fiyatını (price) doğru girdiğinizden emin olunuz");
    return;
  }
  if (
    !req.body.rating ||
    typeof req.body.rating != "number" ||
    req.body.rating < 0 ||
    req.body.rating > 5
  ) {
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
