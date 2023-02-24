const Base = require("../base/baseStructure.js")

class Costumers extends Base{
    constructor({_id,name,age}){
        super({_id,name});
        this.age = age;
    }
}

module.exports = Costumers