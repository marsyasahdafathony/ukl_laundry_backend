const { response } = require("express");
const express = require("express");
const app = express();

// membaca request dari body dengan tipe json
app.use(express.json());

// panggil models
const models = require("../models/index");

// panggil mode; "member"
const member = models.member;

// panggil fungsi auth -> validasi token
const { auth } = require("./login");

// fungsi auth dijadikan middleware
// app.use(auth)

//endpoint for get all member
app.get("/", async (request, response) => {
  let dataMember = await member.findAll();
  return response.json(dataMember);
});

// endpoint add new member
app.post("/", (request, response) => {
  let newMember = {

    nama: request.body.nama,
    alamat: request.body.alamat,
    jenis_kelamin: request.body.jenis_kelamin,
    telp: request.body.telp,
  };

  member
    .create(newMember)
    .then((result) => {
      response.json({
        message: `Data berhasil ditambahkan!`,
      });
    })
    .catch((error) => {
      response.json({
        message: error.message,
      });
    });
});

//endpoint update member
app.put("/:id_member", (request, response) => {
  //menampung data yang akan diubah
  let data = {
    nama: request.body.nama,
    alamat: request.body.alamat,
    jenis_kelamin: request.body.jenis_kelamin,
    telp: request.body.telp,
  };

  let parameter = {
    id_member: request.params.id_member,
  };

  //proses update
  member
    .update(data, { where: parameter })
    .then((result) => {
      return response.json({
        message: `Data berhasil diubah!`,
        data: result,
      });
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
});

//endpoint delete member
app.delete("/:id_member", (request, response) => {
  let parameter = {
    id_member: request.params.id_member,
  };

  member
    .destroy({ where: parameter })
    .then((result) => {
      response.json({
        message: `Data berhasil dihapus!`,
      });
    })
    .catch((error) => {
      response.json({
        message: error.message,
      });
    });
});

module.exports = app;