const Base = require("../base/baseStructure.js")
class Cars extends Base{
    constructor({id,name,releaseYears,avalaibleMoney,gasAvailable}){
        super({id,name});
            this.releaseYears = releaseYears
            this.avalaibleMoney = avalaibleMoney
            this.gasAvailable = gasAvailable
    }
}



module.exports = Cars