const express = require("express");
const uniqid = require("uniqid");

const router = express.Router();

let dataBase = [{ id: "0", title: "Deneme" }]; // Denemek için veritabanı

//Tüm ürünleri listele
router.get("/", (req, res) => {
  console.log("Tüm ürünler listelendi");
  res.json(dataBase);
});

//ID'li ürün getir
router.get("/:id", async (req, res) => {
  console.log(`${req.params.id} id'li ürün listelendi`);
  res.json(
    dataBase.filter((product) => {
      return product.id === req.params.id;
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
