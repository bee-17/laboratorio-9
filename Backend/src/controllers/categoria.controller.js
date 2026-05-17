const Categoria = require('../models/categoria.model');

exports.getAll = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json({ data: categorias });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    res.json({ data: categoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.json({ data: categoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: categoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categoria eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};