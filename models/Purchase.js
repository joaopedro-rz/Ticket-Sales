const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
  userId: DataTypes.INTEGER,
  ticketId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
});

// Associação com o modelo Ticket
Purchase.associate = (models) => {
  Purchase.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
};

module.exports = Purchase;