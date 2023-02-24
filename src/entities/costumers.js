const Base = require("../base/baseStructure.js")

class Costumers extends Base{
    constructor({id,name,age}){
        super({id,name});
        this.age = age;
    }
}

module.exports = Costumers