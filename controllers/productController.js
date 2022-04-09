const db = require("../models");

const Product = db.products;

const Review = db.reviews;

const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);

  res.status(200).json(product);
};

const getAllProduct = async (req, res) => {
  let products = await Product.findAll({});

  res.status(200).json(products);
};

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne(req.body, {
    where: { id: id },
  });

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update({ where: { id: id } });

  res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;

  await Product.destroy({ where: { id: id } });

  res.status(200).json("Product is deleted");
};

const getPublishedProduct = async (req, res) => {
    const product = await Product.findAll({where: {published: true}})

    res.status(200).json(product); 
}



module.exports = {
  addProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getPublishedProduct
};
