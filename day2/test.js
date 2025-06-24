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

// operator ternary
let age = 16;
let isAdult = (age >= 18) ? "Adult" : age > 56 ? "Senior" : "Child";
console.log(isAdult);

//sample - ipk
let ipk = 3.4;
let grade;

if (ipk > 3.5) {
    grade = "Cumlaude";
} else if (ipk >= 3.0) {
    grade = "Baik";
} else {
    grade = "Cukup";
}

console.log("Grade mahasiswa:", grade);

// sample - rekursi
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
console.log("Faktorialnya adalah:", factorial(5));

// sample - looping
for (let i = 0; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i, "Bilangann kelipatan 3 dan 5");
    } else if (i % 3 === 0) {
        console.log(i, "Bilangann kelipatan 3");
    } else if (i % 5 === 0) {
        console.log(i, "Bilangann kelipatan 5");
    } else {
        console.log(i);
    }
}

// sample - function without parameter
function greet() {
    console.log("Halo, saya hafizh!");
}
greet();

// sample - function with parameter
function add(a, b) {
    return a + b;
}
console.log("Hasil penjumlahan:", add(5, 10));

// sample - object method + this
let car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    start: function () {
        console.log("Mobil " + this.brand + " " + this.model + " tahun " + this.year + " dinyalakan.");
    }
};
console.log("Merk Mobil:", car.brand);
car.start();

// sample - objext with contructor
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.introduce = function () {
        console.log("Halo, nama saya " + this.name + " dan saya berusia " + this.age + " tahun.");
    };
}
let person1 = new Person("Alice", 25);
let person2 = new Person("John", 30);

person1.introduce();
person2.introduce();

// sample - object rest parameter
const worker = {
    name: "John",
    age: 30,
    city: "New York"
};
let { city, ...rest } = worker;
console.log(rest);

// sample - spread operator
const user = {
    name: "Jane",
    age: 28,
    gender: "Man"
};

const location = {
    city: "Los Angeles",
    country: "USA"
};

const { gender , ...userDetails } = user;
const { ...locationDetails } = location;

const result = { ...userDetails, ...locationDetails };
console.log(result);





