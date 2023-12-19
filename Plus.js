// init setup
var settings = {
	'node': {
		'fs': null,
		'isNodeJS': false
	}
}
if(require('fs')) {
	settings.fs = require('fs');
	settings.node.isNodeJS = true;
}

// Array+
Array.prototype.removeValue = function(value) {
  return this.filter(function(ele){ 
    return ele != value; 
	});
}

Array.prototype.search = function (value) {
	return this.indexOf(value);
}

// String+

String.prototype.removeAll = function (value) {
	var a = [];
	value.split('').forEach(letter => {
		if(value.includes(letter)) return;
		a.push(letter);
	})
	return a.toString();
}

String.prototype.replaceAll = function (key, value) {
	var b = new RegExp(key, 'g');
	return this.replace(b, value);
}

// nodeJS specific functions.
function appendFile(file, value) {
	if(settings.node.isNodeJS == true) {
		settings.fs.appendFileSync(file, value+'\n');
	} else return;
}

// console.log('Testing...');
// console.log(`
// NodeJS:${settings.node.isNodeJS},
// String tests: Removeall A from abcdea -${String("abcdea").removeAll("a")}
// Replaceall % with b from a%cde%
// -${String("a%cde%").replaceAll("%", "b")}

// `);