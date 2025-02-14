const express = require('express');
const mustacheExpress = require('mustache-express');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
const apiAuthRoutes = require('./routes/api/authRoutes'); // Rotas de autenticação
const apiUserRoutes = require('./routes/api/userRoutes'); // Rotas de usuários
const apiTicketRoutes = require('./routes/api/ticketRoutes'); // Rotas de ingressos
const apiPurchaseRoutes = require('./routes/api/purchaseRoutes');
const webAuthRoutes = require('./routes/web/authRoutes'); // Rotas da interface web
const webTicketRoutes = require('./routes/web/ticketRoutes');
const webPurchaseRoutes = require('./routes/web/purchaseRoutes');
const Ticket = require('./models/Ticket');
const Purchase = require('./models/Purchase');


// Carrega os modelos
Ticket.associate({ Purchase });
Purchase.associate({ Ticket });

const app = express();

// Configuração do Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para cookies
app.use(cookieParser()); // Configura o cookie-parser

// Sincroniza o banco de dados
sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado.');
});

// Rotas da API
app.use('/api/auth', apiAuthRoutes); // Rotas de autenticação
app.use('/api/users', apiUserRoutes); // Rotas de usuários
app.use('/api/tickets', apiTicketRoutes); // Rotas de ingressos
app.use('/api/purchases', apiPurchaseRoutes);

// Rotas da interface web
app.use('/auth', webAuthRoutes);
app.use('/tickets', webTicketRoutes);
app.use('/purchases', webPurchaseRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});