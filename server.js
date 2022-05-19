const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

//call router member
const member = require("./routes/member");
app.use("/member", member);

//call router paket
const paket = require("./routes/paket");
app.use("/paket", paket);

//call router outlet
const outlet = require("./routes/outlet");
app.use("/outlet", outlet);

//call router user
const user = require("./routes/user");
app.use("/user", user);

//call router transaksi
const transaksi = require("./routes/transaksi");
app.use("/transaksi", transaksi);

//call router transaksi
 const login = require("./routes/login");
 app.use("/login", login);

app.listen(8005, () => {
  console.log(`Server run on port 8005`);
});
