const Producto = require('../models/producto.model');

exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.json({ data: productos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate('categoria');
    res.json({ data: producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.json({ data: producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};