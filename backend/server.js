const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

const app = express();

// Should be in an env variable
const api = "/api";
const PORT = 7000;

app.use(cors());
app.use(json());

// Dummy product data
let products = [
  {
    id: nanoid(),
    name: "Addidas Shoes One",
    price: 110,
    discounted_price: 100,
    currency: "USD",
    rate: 5,
    is_sale: true,
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: nanoid(),
    name: "Addidas Shoes Two",
    price: 120,
    discounted_price: 110,
    currency: "USD",
    rate: 5,
    is_sale: true,
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: nanoid(),
    name: "Addidas Shoes Three",
    price: 130,
    discounted_price: 0,
    currency: "USD",
    rate: 4,
    is_sale: false,
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: nanoid(),
    name: "Addidas Shoes Four",
    price: 140,
    discounted_price: 125,
    currency: "USD",
    rate: 3,
    is_sale: true,
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: nanoid(),
    name: "Addidas Shoes Five",
    price: 150,
    discounted_price: 0,
    currency: "USD",
    rate: 2,
    is_sale: false,
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: nanoid(),
    name: "Addidas Shoes Six",
    price: 160,
    discounted_price: 145,
    currency: "USD",
    rate: 1,
    is_sale: true,
    image:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
];

// Dummy shoppingCart data
let shoppingCart = [];

// Get products api
app.get(`${api}/products`, (req, res) => res.send(products));

// Get shoppingCart api
app.get(`${api}/shoppingCart`, (req, res) => res.send(shoppingCart));

// Add to product to shoppingCart api
app.post(`${api}/add-to-shoppingCart`, (req, res) => {
  const item = req.body;

  const existingItem = shoppingCart.find(
    (shoppingCartItem) => shoppingCartItem.id === item.id
  );

  if (existingItem) {
    const updatedItems = shoppingCart.map((shoppingCartItem) => {
      if (shoppingCartItem.id === item.id) {
        return {
          ...shoppingCartItem,
          quantity: shoppingCartItem.quantity + 1,
        };
      }
      return shoppingCartItem;
    });

    shoppingCart = updatedItems;
    res.send(shoppingCart);
  } else {
    const newItem = { ...item, quantity: 1 };

    shoppingCart = [...shoppingCart, newItem];
    res.send(shoppingCart);
  }
});

// Increase product quantity in shoppingCart api
app.post(`${api}/increase-product`, (req, res) => {
  const item = req.body;
  const increasedShoppingCartItems = shoppingCart.map((shoppingCartItem) => {
    if (shoppingCartItem.id === item.id)
      return { ...shoppingCartItem, quantity: shoppingCartItem.quantity + 1 };

    return shoppingCartItem;
  });
  shoppingCart = increasedShoppingCartItems;
  res.send(shoppingCart);
});

// Decrease product quantity in shoppingCart api
app.post(`${api}/decrease-product`, (req, res) => {
  const item = req.body;

  const decreasedShoppingCartItems = shoppingCart.map((shoppingCartItem) => {
    if (shoppingCartItem.id === item.id) {
      const newQuantity = Math.max(1, shoppingCartItem.quantity - 1);
      return { ...shoppingCartItem, quantity: newQuantity };
    }
    return shoppingCartItem;
  });
  shoppingCart = decreasedShoppingCartItems;

  res.send(shoppingCart);
});

// Remove product from shoppingCart api
app.post(`${api}/remove-product`, (req, res) => {
  const item = req.body;
  const updatedItems = shoppingCart.filter(
    (shoppingCartItem) => shoppingCartItem.id !== item.id
  );
  shoppingCart = updatedItems;

  res.send(shoppingCart);
});

// Checkout api
app.post(`${api}/checkout`, (req, res) => {
  shoppingCart = [];
  res.send(shoppingCart);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
