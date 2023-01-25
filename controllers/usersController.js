const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => res.send({ status: true, data }))
    .catch((err) =>
      res.status(err.status).send({ message: "Error", err, body: req.body })
    );
};

module.exports.getSpecificUser = (req, res) => {
  const { userId } = req.params.id;
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario");
      error.status = 404;
      throw error;
    })
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);

      if (user) {
        res.send({ status: true, data: user });
        return;
      }

      res.status(404).send({ message: "No existe tal usuario" });
    })
    .catch((err) =>
      res.status(500).send({ message: "error", err, body: req.body })
    );
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
    .then(() => {
      User.findById(userId);
    })
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);

      if (user) {
        res.send({ status: true, data: user });
        return;
      }

      res.status(404).send({ message: "No existe tal usuario" });
    })
    .catch((err) =>
      res.status(err.status).send({ message: "Error", err, body: req.body })
    );
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
    .then(() => {
      User.findById(userId);
    })
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);

      if (user) {
        res.send({ status: true, data: user });
        return;
      }

      res.status(404).send({ message: "No existe tal usuario" });
    })
    .catch((err) =>
      res.status(err.status).send({ message: "Error", err, body: req.body })
    );
};
