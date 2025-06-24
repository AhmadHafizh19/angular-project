console.log("Hello World!");

// const bumi = "bulat";
bumi = "datar";

// variable - let
let nama = "John";
let benda = "gunting";
benda = "batu";
console.log(benda);

// array
let fruits = ["apple", "apple", "cherry"];
fruits[0] = "banana";
console.log(fruits[0]);

// object
let person = {
    name: "John",
    age: 30,
    isStudent: false,
};
console.log(person.name);

//array of objects
let people = [
    { name: "John", age: 30, isStudent: false },
    { name: "Doe", age: 25, isStudent: true },
];
console.log(people[1].name, people[1].age);

// operator
let a = 10;
let b = "10";
console.log(a == b); // true, karena js melakukan type coercion (konversi tipe data) saat membandingkan

let c = true; 
let d = "true";
console.log(c == d); // false, karena js tidak bisa membandingkan boolean dengan string

// operator ternerary
let age = 16;
let isAdult = age >= 18 ? "Adult" : age > 56 ? "Senior" : "Child";
console.log(isAdult);


