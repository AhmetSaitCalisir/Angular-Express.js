const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MERHABA DÜNYA");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server başlatıldı => http://localhost:${port}/`);
});
