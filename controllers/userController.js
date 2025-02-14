const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários.", error });
  }
};

exports.buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário.", error });
  }
};

exports.criarUsuario = async (req, res) => {
  const { username, password } = req.body;
  try {
    const senhaHash = await bcrypt.hash(password, 10);
    const novoUsuario = await User.create({ username, password: senhaHash });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário.", error });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    usuario.username = username || usuario.username;
    if (password) {
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário.", error });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    await usuario.destroy();
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário.", error });
  }
};
