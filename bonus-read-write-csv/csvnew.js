const fs = require("fs");

const separator = ";"

const exampleData = [
    {name: "Alisa", age: 12},
    {name: "Bob", age: 60},
    {name: "Trololo", age: 35}
]

fs.writeFileSync("some.csv", exampleData.map(row => `${row.name}${separator}${row.age}`).join("\n"))