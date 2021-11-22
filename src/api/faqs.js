const express = require("express");
const router = express.Router();
const monk = require("monk");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());

var SECRET_TOKEN = "hsduabej2h3g4ld9qh2pdh39dhq93hdp3hb3iqmloepu21hdmc03hf";

const {
  Validation,
  validLogin,
  validAkun,
  validRegis,
  validPost,
  validKomen,
} = require("./validasi");

const db = monk(
  "mongodb+srv://bryanz75:okpok123@cluster0.01g8q.mongodb.net/gaulin?retryWrites=true&w=majority"
);
db.then(() => {
  console.log("Connected correctly to server");
});

const postingan = db.get("postingan");
const komens = db.get("komen");
const akun = db.get("akun");

router.get("/post", (req, res) => {
  postingan.find().then((Post) => {
    res.json(Post.reverse());
  });
});
router.get("/komen", (req, res) => {
  komens.find().then((Komen) => {
    res.json(Komen);
  });
});
router.get("/komen/:id", (req, res) => {
  komens.findOne({ id_status: req.params.id }).then((Komen) => {
    res.json(Komen);
  });
});

router.post("/login", validLogin, Validation, (req, res) => {
  const { username, pw } = req.body;
  akun.findOne({ username: username, pw: pw }).then((body) => {
    if (body < 1) {
      res.json({
        message: "Username / Password Salah",
      });
    } else {
      const access_token = jwt.sign(body, SECRET_TOKEN);
      res.json({
        access_token: access_token,
      });
    }
  });
});

router.post("/akun", validAkun, Validation, (req, res) => {
  const { access_token } = req.body;
  const body = jwt.verify(access_token, SECRET_TOKEN);
  res.json(body);
});

router.post("/regis", validRegis, Validation, (req, res) => {
  const { nama, username, pw } = req.body;
  const newAkun = {
    nama: nama,
    username: username,
    pw: pw,
  };
  akun.insert(newAkun).then((body) => {
    res.json(body);
  });
});

router.post("/komen", validKomen, Validation, (req, res) => {
  const { komen, id, nama } = req.body;
  const newKomen = {
    nama: nama,
    id_status: id,
    komen: komen,
    created: new Date(),
  };
  komens.insert(newKomen).then((komentar) => {
    res.json(komentar);
  });
});

router.post("/post", validPost, Validation, (req, res) => {
  const { status, nama } = req.body;
  const newPost = {
    nama: nama,
    status: status,
    created: new Date().getTime(),
  };

  postingan.insert(newPost).then((createdPost) => {
    res.json(createdPost);
  });
});

module.exports = router;
