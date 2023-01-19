const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
};

module.exports.getSpecificUser = (req, res) => {
  const { userId } = req.params._id;
  User.findById(userId)
    .orFail()
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);

      if (user) {
        res.send({ message: "se encontro el usuario" });
        return;
      }

      res.status(404).send({ message: "No existe tal usuario" });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
};

module.exports.updateProfile = (req, res) => {
  const { userId } = req.user._id;
  User.findById(userId)
    .orFail()
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);

      if (user) {
        res.send(user);
        return;
      }

      res.status(404).send({ message: "No existe tal usuario" });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
};
