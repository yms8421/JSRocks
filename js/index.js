var person = ob.createObservable({
    name: "Can",
    surname: "PERK",
    age: 31
});

person.createComputed("fullName", function (i) {
    return i.name + " " + i.surname;
});

person.createComputed("birthYear", function (i) {
    return new Date().getFullYear() - i.age;
});

defineAttachers(person);

function update() {
    person.set("name", "Gamze");
    person.set("surname", "Efendioğlu");
    person.set("age", 26);
}

function defineAttachers(observable) {
    observable.attach("txtName", "name");
    observable.attach("txtLastName", "surname");
    observable.attach("age");
    observable.attach("fullName");
    observable.attach("birthYear");
}
// person.print();
// person.set("age", 26);
// person.set("name", "Gamze");
// person.set("surname", "Efendioğlu");

// person.print();

// person.set("surname", "Efendi");
// person.set("age", 40);

// person.print();