declare
=======

Create a constructor using a compact notation for inheritance and prototype extension.

### Installation

for Node

    npm install oop-declare

for Bower

    bower install declare

### Usage

    const Parent = declare(null, {
        init: function (params) {
          declare.mixin(this,params);
          return this;
        },
        sayName: function () {
          console.log(this.name);
          return this;
        },
    });

    const Child = declare(Parent, {
        init: function () {
          Parent.prototype.init.apply(this,arguments); // strict mode
          // this.inherited(arguments); // non strict mode
          return this;
        },
        sayAge: function () {
          console.log(this.age);
          return this;
        },
    });

    const boy = new Child({
      name: "Raoh",
      age: 20,
    });

    boy.sayName().sayAge();
    // Raoh
    // 20

### License

    MIT
