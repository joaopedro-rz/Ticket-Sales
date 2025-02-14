const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
  }
};

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Acessa o token do cookie
  if (!token) return res.redirect('/auth/login'); // Redireciona para o login se não houver token

  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (error) {
    res.redirect('/auth/login'); // Redireciona para o login se o token for inválido
  }
};

module.exports = { authenticate, isAdmin }; // Exporta ambos os middlewares