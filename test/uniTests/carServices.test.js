const { describe, it, before, beforeEach, afterEach } = require("mocha")
const service = require("../../services/service")
const transation = require("../../src/entities/transation")
const { join } = require("path")
const { expect } = require("chai")
const sinon = require("sinon")
const databaseFiles = join(__dirname,"../../database/","cars.json")
const mocks = {
    valid_car: require("../mocks/valid-car.json"),
    valid_carCategory: require("../mocks/valid-carCategory.json"),
    valid_costumer: require("../mocks/valid-costumer.json")
}
describe("CarService Suite Test",()=>{
    let sandbox = {}
    let carService = {}

    before(()=>{
         carService =  new service({cars:databaseFiles})
    })

    beforeEach(()=>{
        sandbox = sinon.createSandbox()
    })

    afterEach(()=>{
        sandbox.restore()
    })

    it("It should retrieve a random position form an array",()=>{
        const data = [0,1,2,3,4]
        const result = carService.getRandomPositon(data)
        expect(result).to.be.lte(data.length).and.gte(0)
    })
    it("Should choose the first id from cardIds in carCategory",()=>{
        const mokc_carCategory = mocks.valid_carCategory;
        const carIndex = 0

        sandbox.stub(
            carService,
            carService.getRandomPositon.name
        ).returns(carIndex)

        const result = carService.chooseRandomVeycle(mokc_carCategory)
        const expected = mokc_carCategory.carId[carIndex]
        expect(result).to.be.deep.equal(expected)
    })

    it("Given a car category, it should return an avalaible car",async()=>{
        const car = mocks.valid_car;
        const carCategory = Object.create(mocks.valid_carCategory);
        carCategory.carId = [car._id]

        sandbox.stub(
            carService.CarRepository,
            carService.CarRepository.find.name,
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomVeycle.name
        )
        
        const result = await carService.getAvailableCar(carCategory);
        const expected = car
        expect(result).to.be.deep.equal(expected)
        expect(carService.chooseRandomVeycle.calledOnce).to.be.ok
        expect(carService.CarRepository.find.calledWithExactly(car._id))

    })

    it("Given a carCategory, costumer and numberOfDay it should calculate final amout in space of 5 days", async()=>{
        const costumer = Object.create(mocks.valid_costumer)
        costumer.age = 50

        const carCategory = Object.create(mocks.valid_carCategory)
        carCategory.price = 37.6

        const numberOfDay = 5
        //When we doesnt depends to value that come to database
        sandbox.stub(
            carService,
            "taxBaseOnCurrency"
        ).get(()=>[{from:40,to:50,then:1.3}])

        const expected = carService.currentCurrency.format(244.40)
        const result = carService.calculateFinalPrice(costumer,carCategory,numberOfDay)

        expect(result).to.be.deep.equal(expected)
    })

    it("GIven a costumer and a car actegory it should return a transation receipt",async()=>{
        const car = mocks.valid_car
        const carCategory ={
            ...mocks.valid_carCategory,
            price:37.6,
            carId:[car._id]
        };

        const costumer = Object.create(mocks.valid_costumer);
        costumer.age = 20
        const numberOfDay = 5;
        const dueDate = "10 de novembro de 2022"
        const now = new Date(2022, 10, 5)

        //To provide succefully test
        sandbox.useFakeTimers(now.getTime())
        sandbox.stub(
            carService.CarRepository,
            carService.CarRepository.find.name
        ).resolves(car)
        
        const expectedAmount = carService.currentCurrency.format(206.80);

        const result = await carService.rent(costumer,carCategory,numberOfDay);
        const expected = new transation({costumer, car, amount:expectedAmount, dueDate})

        expect(result).to.be.deep.equal(expected)
        
        
    })

})