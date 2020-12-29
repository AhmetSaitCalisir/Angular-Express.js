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
};
