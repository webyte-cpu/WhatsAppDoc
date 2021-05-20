const people = require("./data.js")
const data = require("./data.js")

const distance = require("./distance.js")

const searchDistance = (yourCords, data, parameter) => {

    return data.filter( (people) => {
        let totalDistance = distance(yourCords[0], yourCords[1], people["coords"][0], people["coords"][1])
        console.log(totalDistance)

        people["totalDistance"] = totalDistance

        return totalDistance < parameter
    })

}

const searchAge = (data, parameter) => {
    return data.filter( (people) => {

        console.log(people["age"])
        return people["age"] <= parameter
    })
}

let yourCords = [10.744589557784257, 122.55163398653211]

console.log(searchAge(data, 17))
// console.log(searchDistance(yourCords, data, 100))