const BaseRepository = require("../src/repository/base_repo/baseRepository.js")
const Tax = require("../src/entities/tax")
const transation = require("../src/entities/transation")

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
    async rent(costumer,carCategory,numberOfDay){
        const amount = this.calculateFinalPrice(costumer,carCategory,numberOfDay);
        const car = await this.getAvailableCar(carCategory)

        const today = new Date()
        today.setDate(today.getDate() + numberOfDay)
        const options = {year:"numeric", month:"long", day:"numeric"}
        const dueDate = today.toLocaleDateString("pt-br",options)

        return new transation({costumer,car, amount, dueDate})
         

    }
}
module.exports=CarService