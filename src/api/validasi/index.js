const { check, validationResult } = require("express-validator");

exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(501).json({
      pesan: errors.array()[0].msg,
    });
  }
  next();
};

exports.validLogin = [
  check("username", "Username tidak boleh kosong").notEmpty(),
  check("pw", "Password tidak boleh kosong").notEmpty(),
];
exports.validAkun = [
  check("access_token", "Terjadi kesalahan silahkan tunggu sesaat").notEmpty(),
];
exports.validRegis = [
  check("nama", "Nama tidak boleh kosong").notEmpty(),
  check("username", "Username tidak boleh kosong").notEmpty(),
  check("pw", "Password tidak boleh kosong").notEmpty(),
];
exports.validKomen = [
  check("komen", "Isi tidak boleh kosong").notEmpty(),
  check("id", "Terjadi Kesalahan silahkan tunggu beberapa saat").notEmpty(),
  check("nama", "Terjadi Kesalahan silahkan tunggu beberapa saat").notEmpty(),
];
exports.validPost = [
  check("status", "Isi tidak boleh kosong").notEmpty(),
  check("nama", "Terjadi Kesalahan silahkan tunggu beberapa saat").notEmpty(),
];
