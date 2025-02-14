const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rota para a página de registro
router.get('/register', (req, res) => {
    res.render('register'); // Renderiza a view register.mustache
  });

 // Processa o formulário de registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.redirect('/auth/login'); // Redireciona para a página de login após o registro
  } catch (error) {
    res.status(500).send('Erro ao registrar usuário');
  }
});
// Rota para a página de login
router.get('/login', (req, res) => {
  res.render('login'); // Renderiza a view login.mustache
});

// Processa o formulário de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }); // Armazena o token em um cookie
      res.redirect('/tickets'); // Redireciona para a página de ingressos após o login
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (error) {
    res.status(500).send('Erro ao fazer login');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Remove o token do cookie
  res.redirect('/auth/login'); // Redireciona para a página de login
});

module.exports = router;