const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal usuario" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};

module.exports.getSpecificUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal usuario" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
};

module.exports.updateProfile = (req, res) => {
  const { userId } = req.params.id;
  const { name, about } = req.body;
  User.updateOne({ _id: userId }, { name, about })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal usuario" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { userId } = req.params.id;
  const { avatar } = req.body;
  User.updateOne({ _id: userId }, { avatar })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => {
      res.send({ status: true, data: data });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "no existe tal usuario" });
      } else {
        res.status(500).send({ message: "Error", err, body: req.body });
      }
    });
};
