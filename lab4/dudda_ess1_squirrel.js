/**
 * Created by amdudda on 2/2/16.
 */

var Squirrel = function(n) {
    this.name = n;
    this.nuts = 0;
}

// a method for Squirrels
Squirrel.prototype.sayHello = function()
{
    console.log("Hello from " + this.name + "!");
}

// what's a squirrel's favorite food?
Squirrel.prototype.faveFood = function()
{
    console.log(this.name + "\'s favorite food is nuts.");
}

// let's help squirrels add to their hoard
Squirrel.prototype.hoardNuts = function(addNuts)
{
    this.nuts += addNuts;
}


// mama squirrel
var keiko = new Squirrel("Keiko");

// and test our methods
keiko.sayHello();
keiko.faveFood();
console.log("Keiko has " + keiko.nuts + " nuts in storage.  Let's add 3 nuts to her hoard.");
keiko.hoardNuts(3);
console.log("Keiko now has " + keiko.nuts + " nuts in storage.");
console.log("\n");

var hiro = new Squirrel("Hiro");
hiro.faveFood();
hiro.sayHello();
// add some nuts
hiro.hoardNuts(4);
console.log(hiro.name + " has " + hiro.nuts + " nuts in his hoard.");
console.log("\n");

// in-class task: create Jumpy the Squirrel and work with the object.
var jumpy = new Squirrel("Jumpy");
jumpy.sayHello();
jumpy.hoardNuts(3);
jumpy.hoardNuts(12);
jumpy.hoardNuts(40);
console.log(jumpy.name + " has " + jumpy.nuts + " nuts in their hoard.\n");


// LAB 4:
// add a jump function
Squirrel.prototype.jump = function(){
    console.log(this.name + " is jumping!");
}

console.log("testing jump:\n");
//keiko.jump();

var allSquirrels = [keiko,hiro,jumpy];
for (var sq in allSquirrels) {
    // interesting... sq is the index of the array, not the value of the array element
    console.log(allSquirrels[sq].name);
    allSquirrels[sq].jump();
}