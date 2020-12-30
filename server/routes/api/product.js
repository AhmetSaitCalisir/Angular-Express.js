const express = require("express");

const router = express.Router();

const validation = require("./validation");

let dataBase = require("../../database/product.json");

//Tüm ürünleri listele
router.get("/", (req, res) => {
  console.log("Tüm ürünler listelendi");
  res.json(dataBase);
});

//Title filtreli ürünlerin listelenmesi
router.get("/title/:title", (req, res) => {
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

//Tip filtreli ürünlerin listelenmesi
router.get("/type/:type", (req, res) => {
  if (validation.productExist(dataBase, req.params.type, "type")) {
    console.log(`${req.params.type} tip ürünler listelendi`);
    res.json(
      dataBase.filter((product) => {
        return product.type === req.params.type;
      })
    );
  } else {
    res.status(400).send(`${req.params.type} tipinde ürün bulunmamaktadır`);
  }
});

//Derece Filtreli ürünlerin listelenmesi
//  Tam olarak derece
router.get("/rating/exact/:rating", (req, res) => {
  if (validation.productExist(dataBase, req.params.rating, "rating")) {
    console.log(`${req.params.rating} dereceli ürünler listelendi`);
    res.json(
      dataBase.filter((product) => {
        return product.rating == req.params.rating;
      })
    );
  } else {
    res
      .status(400)
      .send(`${req.params.rating} derecesine sahip ürün bulunmamaktadır`);
  }
});
//  Derecenin üstü
router.get("/rating/over/:rating", (req, res) => {
  const response = dataBase.filter((product) => {
    return product.rating >= parseInt(req.params.rating);
  });
  if (response.length >= 1) {
    console.log(`${req.params.rating} derecesinden yüksek ürünler listelendi`);
    res.json(response);
  } else {
    res
      .status(400)
      .send(`${req.params.rating} derecesinden yüksek ürün bulunmamaktadır`);
  }
});
//  Derecenin altı
router.get("/rating/below/:rating", (req, res) => {
  const response = dataBase.filter((product) => {
    return product.rating <= parseInt(req.params.rating);
  });
  if (response.length >= 1) {
    console.log(`${req.params.rating} derecesinden düşük ürünler listelendi`);
    res.json(response);
  } else {
    res
      .status(400)
      .send(`${req.params.rating} derecesinden düşük ürün bulunmamaktadır`);
  }
});
//  Derecenin arası
router.get("/rating/between/:ratingH/:ratingL", (req, res) => {
  const response = dataBase.filter((product) => {
    return (
      product.rating <= parseInt(req.params.ratingH) &&
      product.rating >= parseInt(req.params.ratingL)
    );
  });
  if (response.length >= 1) {
    console.log(
      `${req.params.ratingH} derecesinden düşük ve ${req.params.ratingL} derecesinden yüksek ürünler listelendi`
    );
    res.json(response);
  } else {
    res
      .status(400)
      .send(
        `${req.params.ratingH} derecesinden düşük ve ${req.params.ratingL} derecesinden yüksek ürün bulunmamaktatır`
      );
  }
});

//Fiyat Filtreli ürünlerin listelenmesi
//  Tam olarak fiyat
router.get("/price/exact/:price", (req, res) => {
  if (validation.productExist(dataBase, req.params.price, "price")) {
    console.log(`${req.params.price} fiyatlı ürünler listelendi`);
    res.json(
      dataBase.filter((product) => {
        return product.price == req.params.price;
      })
    );
  } else {
    res.status(400).send(`${req.params.price} fiyatında ürün bulunmamaktadır`);
  }
});
//  Fiyatın üstü
router.get("/price/over/:price", (req, res) => {
  const response = dataBase.filter((product) => {
    return product.price >= parseInt(req.params.price);
  });
  if (response.length >= 1) {
    console.log(`${req.params.price} fiyatından yüksek ürünler listelendi`);
    res.json(response);
  } else {
    res
      .status(400)
      .send(`${req.params.price} fiyatından yüksek ürün bulunmamaktadır`);
  }
});
//  Fiyatın altı
router.get("/price/below/:price", (req, res) => {
  const response = dataBase.filter((product) => {
    return product.price <= parseInt(req.params.price);
  });
  if (response.length >= 1) {
    console.log(`${req.params.price} fiyatından düşük ürünler listelendi`);
    res.json(response);
  } else {
    res
      .status(400)
      .send(`${req.params.price} fiyatından düşük ürün bulunmamaktadır`);
  }
});
//  Fiyatlar arası
router.get("/price/between/:priceH/:priceL", (req, res) => {
  const response = dataBase.filter((product) => {
    return (
      product.price <= parseInt(req.params.priceH) &&
      product.price >= parseInt(req.params.priceL)
    );
  });
  if (response.length >= 1) {
    console.log(
      `${req.params.priceH} fiyatından düşük ve ${req.params.priceL} fiyatından yüksek ürünler listelendi`
    );
    res.json(response);
  } else {
    res
      .status(400)
      .send(
        `${req.params.priceH} fiyatından düşük ve ${req.params.priceL} fiyatından yüksek ürün bulunmamaktadır`
      );
  }
});

//Ürün ekle
router.post("/", (req, res) => {
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
  if (validation.productExist(dataBase, req.params.title, "title")) {
    dataBase = dataBase.filter((product) => product.title != req.params.title);
    console.log(`${req.params.title} isimli ürün silindi`);
    res.status(200).send(`${req.params.title} isimli veri silindi`);
  } else {
    res.status(400).send(`${req.params.title} isimli ürün bulunmamaktadır`);
  }
});

module.exports = router;
