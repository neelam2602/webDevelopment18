var result1 = 1000;
var result2 = [100,200];
var result3 = {name : 'ajay',age:20};
var result4 = function(){return "function data";}

var result5 = function(a,b,c){
	return `sum of => ${a+b+c}`;
}

module.exports = {
	x1:result1,
	x2:result2,
	x3:result3,
	x4:result4,
	x5:result5
}