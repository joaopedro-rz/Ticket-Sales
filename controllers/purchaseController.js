const Purchase = require("../models/Purchase");
const Ticket = require("../models/Ticket");

exports.listarCompras = async (req, res) => {
  try {
    const usuarioId = req.user.userId;
    const compras = await Purchase.findAll({
      where: { userId: usuarioId },
      include: [{ model: Ticket, attributes: ["name", "price"] }],
    });

    if (!compras.length) {
      return res.status(404).json({ message: "Nenhuma compra encontrada." });
    }

    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar compras.", error });
  }
};

exports.detalhesCompra = async (req, res) => {
  try {
    const compraId = req.params.id;
    const usuarioId = req.user.userId;

    const compra = await Purchase.findOne({
      where: { id: compraId, userId: usuarioId },
      include: [{ model: Ticket, attributes: ["name", "price", "description"] }],
    });

    if (!compra) {
      return res.status(404).json({ message: "Compra não encontrada." });
    }

    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar detalhes da compra.", error });
  }
};
