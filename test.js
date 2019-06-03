class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}

class Rectangle extends Shape {
    constructor(length, width) {
        super();
        // ...
    }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确