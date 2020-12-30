module.exports = {
  productT_T_D(title_type_description = -1) {
    console.log(title_type_description);
    return typeof title_type_description == "string";
  },
  productPrice(price = "q") {
    console.log(price);
    return typeof price == "number" && price > 0;
  },
  productRating(rating = "q") {
    console.log(rating);
    return typeof rating == "number" && rating >= 0 && rating <= 5;
  },
  productExist(dataBase, value, wanted) {
    if (!Array.isArray(dataBase)) {
      console.log("dataBase Array olmalıdır");
      return false;
    }
    if (typeof wanted != "string") {
      console.log("Wanted değeri string olmalıdır");
      return false;
    }
    let bulundu = false;
    dataBase.forEach((product) => {
      if (product[wanted] == value) {
        bulundu = true;
      }
    });
    return bulundu;
  },
};
