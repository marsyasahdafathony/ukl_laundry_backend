const { response, request } = require("express");
const express = require("express");
const app = express();
const md5 = require("md5");
app.use(express.json());

const models = require("../models/index");
const user = models.user;
const outlet = models.outlet;

// panggil fungsi auth -> validasi token
const auth = require("../auth");

// fungsi auth dijadikan middleware
// app.use(auth)

// endpoint for get all users
app.get("/", async (request, response) => {
  let dataUser = await user.findAll({
    include: {
      model: models.outlet,
      as: "outlet",
    },
  });

  return response.json(dataUser);
});

// endpoint add new users
app.post("/", (request, response) => {
  let newUser = {
    
    nama: request.body.nama,
    username: request.body.username,
    password: md5(request.body.password),
    id_outlet: request.body.id_outlet,
    role: request.body.role,
    
  };

  user
    .create(newUser)
    .then((result) => {
      response.json({
        message: `Data berhasil ditambahkan`,
        data: result,
      });
    })
    .catch((error) => {
      response.json({
        message: error.message,
      });
    });
});

//endpoint update data member
app.put("/:id_user", (request, response) => {
  // tampung data user
  let data = {
    
    nama: request.body.nama,
    username: request.body.username,
    password: md5(request.body.password),
    id_outlet: request.body.id_outlet,
    role: request.body.role,
    
  };
  if (request.body.password) {
    data.password = md5(request.body.password);
  }

  let parameter = {
    id_user: request.params.id_user,
  };

  //proses update
  user
    .update(data, { where: parameter })
    .then((result) => {
      return response.json({
        message: `Data berhasil diupdate`,
        data: result,
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
});

// endpoint hapus data users
app.delete("/:id_user", (request, response) => {
  //tampung data user
  let parameter = {
    id_user: request.params.id_user,
  };

  // proses hapus
  user
    .destroy({ where: parameter })
    .then((result) => {
      return response.json({
        message: `Data berhasil dihapus`,
        data: result,
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
});
module.exports = app;