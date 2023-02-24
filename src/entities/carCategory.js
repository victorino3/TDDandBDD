const Base = require("../base/baseStructure.js")

class CarCategory extends Base{
    constructor({id,name,carId,price}){
        super({id,name});
        this.carId = carId;
        this.price = price;
    }
}

module.exports = CarCategory