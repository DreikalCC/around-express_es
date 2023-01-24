const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.status(err.statusCode).send({ message: "Error", err, body: req.body })
    );
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const { owner } = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params.id;
  Card.findByIdAndDelete({ _id: cardId })
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      const cards = JSON.parse(data);
      const card = cards.find((item) => item.cardId === cardId);

      if (card) {
        res.send(card);
        return;
      }

      res.status(404).send({ message: "No existe tal tarjeta" });
    })
    .catch((err) =>
      res.status(err.statusCode).send({ message: "Error", err, body: req.body })
    );
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      const cards = JSON.parse(data);
      const card = cards.find((item) => item.cardId === cardId);

      if (card) {
        res.send(card);
        return;
      }

      res.status(404).send({ message: "No existe tal tarjeta" });
    })
    .catch((err) =>
      res.status(err.statusCode).send({ message: "Error", err, body: req.body })
    );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((data) => {
      const cards = JSON.parse(data);
      const card = cards.find((item) => item.cardId === cardId);

      if (card) {
        res.send(card);
        return;
      }

      res.status(404).send({ message: "No existe tal tarjeta" });
    })
    .catch((err) =>
      res.status(err.statusCode).send({ message: "Error", err, body: req.body })
    );
