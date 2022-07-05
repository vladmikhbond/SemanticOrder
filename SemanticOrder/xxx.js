class Animal {
    feed() {
        console.log("Кормим животное");
    }
}
class Movable {
    constructor() {
        this.speed = 0;
    }
    move() {
        console.log("Перемещаемся");
    }
}
class Horse {
}
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(Horse, [Animal, Movable]);
let pony = new Horse();
pony.feed();
pony.move();
//# sourceMappingURL=xxx.js.map