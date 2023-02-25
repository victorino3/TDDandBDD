const {describe, it} = require("mocha")
const service = require("../../services/service")
const {join} = require("path")
const {expect} = require("chai")
const databaseFiles = join(__dirname,"../../database/","cars.json")
describe("CarService Suite Test",()=>{
    let carService = {}
    before(()=>{
         carService =  new service({cars:databaseFiles})
    })
    it("It should retrieve a random position form an array",()=>{
        const data = [0,1,2,3,4]
        const result = carService.getRandomPositon(data)
        console.log(result)
        expect(result).to.be.lte(data.length).and.gte(0)
    })
    it("Given a car category, it should return an avalaible car",async()=>{
        const result = await carService.test('27c40b42-b552-42f7-955b-7372eeccb2ff')
        //console.log("result ", result)
    })
})