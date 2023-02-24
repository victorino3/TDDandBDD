const { faker } = require('@faker-js/faker');
const {join} = require("path")
const baseGenerator = join(__dirname,"./database")
const constumers = require("../src/entities/costumers")
const carCategory = require("../src/entities/carCategory")
const cars = require("../src/entities/cars");


const CarCategory = new carCategory({
    _id:faker.datatype.uuid(),
    name:faker.internet.userName(),
    carId:[],
    price:faker.finance.amount()
})
