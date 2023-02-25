const BaseRepository = require("../repository/base/baseRepository.js")

class CarService{
    constructor({cars}){
        this.CarRepository = new BaseRepository({file:cars})
    }
    getRandomPositon(list){
        return Math.floor(Math.random() * list.length)
    }

    test(id){
        return this.CarRepository.find(id)
    }
}
module.exports=CarService