const Base = require("../base/baseStructure.js")

class CarCategory extends Base{
    constructor({_id,name,carId,price}){
        super({_id,name});
        this.carId = carId;
        this.price = price;
    }
}

module.exports = CarCategory