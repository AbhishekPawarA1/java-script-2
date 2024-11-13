function Product(name, price, quantity) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

Product.prototype.getInfo = function () {
  return `Product: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`;
};

function Electronics(name, price, quantity, brand, model) {
  Product.call(this, name, price, quantity);
  this.brand = brand;
  this.model = model;
}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.powerOn = function () {
  console.log(`${this.brand} ${this.model} is now ON.`);
};

Electronics.prototype.powerOff = function () {
  console.log(`${this.brand} ${this.model} is now OFF.`);
};

function Clothing(name, price, quantity, size, material) {
  Product.call(this, name, price, quantity);
  this.size = size;
  this.material = material;
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;

Clothing.prototype.getDetails = function () {
  return `Clothing: ${this.name}, Size: ${this.size}, Material: ${this.material}`;
};

function Books(name, price, quantity, author, genre) {
  Product.call(this, name, price, quantity);
  this.author = author;
  this.genre = genre;
}

Books.prototype = Object.create(Product.prototype);
Books.prototype.constructor = Books;

Books.prototype.getBookInfo = function () {
  return `Book: ${this.name}, Author: ${this.author}, Genre: ${this.genre}`;
};

const laptop = new Electronics("Laptop", 1200, 10, "Dell", "Inspiron 15");
const tshirt = new Clothing("T-Shirt", 20, 50, "L", "Cotton");
const novel = new Books(
  "The Great Gatsby",
  10,
  100,
  "F. Scott Fitzgerald",
  "Fiction"
);

console.log(laptop.getInfo());
laptop.powerOn();

console.log(tshirt.getInfo());
console.log(tshirt.getDetails());

console.log(novel.getInfo());
console.log(novel.getBookInfo());
