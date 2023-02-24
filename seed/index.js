const { faker } = require('@faker-js/faker');
const {join} = require("path")
const {writeFile} = require("fs/promises")
const baseGenerator = join(__dirname,"../database")
const constumers = require("../src/entities/costumers")
const carCategory = require("../src/entities/carCategory")
const cars = require("../src/entities/cars");


const CarCategory = new carCategory({
    _id:faker.datatype.uuid(),
    name:faker.internet.userName(),
    carId:[],
    price:faker.finance.amount()
});

const avalaibleCars = []
const constumersSystem = []
const amount_cars = 2;
for (let index = 0; index <= amount_cars; index++) {
    let car = new cars({
        _id:faker.datatype.uuid(),
        name:faker.vehicle.type(),
        releaseYears:faker.date.past().getFullYear(),
        avalaible:true,
        gasAvailable:true
    })
    const Constumers = new constumers({
        _id:faker.datatype.uuid(),
        name:faker.name.fullName(),
        age:faker.datatype.number({ min: 18, max: 58,}) 
    })
    constumersSystem.push(Constumers)
    CarCategory.carId.push(car._id);
    avalaibleCars.push(car)
   
   
}
    
const write = async (filename,data)=>{ await writeFile(join(baseGenerator,filename), JSON.stringify(data),{encoding: "utf8"})}


    ;

(async()=>{
    write("cars.json",avalaibleCars)
    write("carCategory.json",[CarCategory])
    write("costumers.json",constumersSystem)
})()
