const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.status(500).send({ message: "Error", err, body: req.body })
    );
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const { owner } = req.user._id;
  Card.create({ name, link, owner })
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error", err, body: req.body });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params.id;
  Card.findById(cardId)
    .orFail()
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
      res.status(500).send({ message: "Error", err, body: req.body })
    );
};
