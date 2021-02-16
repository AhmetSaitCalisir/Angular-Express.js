const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const product = require("./routes/api/product");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MERHABA DÜNYA");
});

app.use(express.static("assets"));
app.use("/api/product", product);

const port = process.env.PORT || 4545;

app.listen(port, () => {
  console.log(`Server başlatıldı => http://localhost:${port}/`);
});
