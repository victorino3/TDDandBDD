const Base = require("../base/baseStructure.js")
class Cars extends Base{
    constructor({_id,name,releaseYears,avalaible,gasAvailable}){
        super({_id,name});
            this.releaseYears = releaseYears
            this.avalaible = avalaible
            this.gasAvailable = gasAvailable
    }
}



module.exports = Cars