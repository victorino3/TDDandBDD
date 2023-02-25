const BaseRepository = require("../repository/base/baseRepository.js")
const Tax = require("../src/entities/tax")

class CarService{
    constructor({cars}){
        this.CarRepository = new BaseRepository({file:cars})
        this.taxBaseOnCurrency = Tax.taxBaseOnAge
        this.currentCurrency = new Intl.NumberFormat("de-DE",{
            style:"currency",
            currency:"EUR"
        })

    }
    getRandomPositon(list){
        return Math.floor(Math.random() * list.length)
    }
    chooseRandomVeycle(carCategory){
        const randomIndexCar = this.getRandomPositon(carCategory.carId)
        return carCategory.carId[randomIndexCar]

    }

    test(id){
        return this.CarRepository.find(id)
    }

    async getAvailableCar(carCategory){
        const randomVeycleId = this.chooseRandomVeycle(carCategory)
        return await this.CarRepository.find(randomVeycleId);
    }
    calculateFinalPrice(costumer,carCategory,numberOfDay){
        const {age} = costumer
        const price = carCategory.price
        const {then : tax } = this.taxBaseOnCurrency
            .find(tax => age >= tax.from && age <= tax.to )

        const finalPrice = ((tax * price ) * (numberOfDay))
        const formattedPrice = this.currentCurrency.format(finalPrice)
        return formattedPrice
    }
}
module.exports=CarService