'use strict'

// Object for storing numbers and modes(addition, substraction, division, multiplication)
let storage = {
	displayNumber: [],
	numberOne: undefined,
	numberTwo: undefined,
	mode: "",
	lastMode: "",
	calculated: false,
	disable: true
}

// Operation object
let operations = {
	multiply: function(number1, number2) {
		return number1 * number2;
	},
	divide: function(number1, number2) {
		return number1 / number2;
	},
	addition: function(number1, number2) {
		return parseInt(number1) + parseInt(number2);
	},
	subtract: function(number1, number2) {
		return parseInt(number1) - parseInt(number2);
	}
}

// input handler
let handlers = {

	// display the given number in the input
	addNumber: function(number) {
		storage.displayNumber.push(number);
	},

	changeToNumber: function(arrayNumber) {
		let number = "";
		for(let i = 0; i < arrayNumber.length; i++) {
			number = number + arrayNumber[i];
		}
		$("#display").val(number);
	}
	
}

// view object holding event listeners for all buttons and actions for the given event
let view = {

	// event listeners
	setUpEventListener: function() {

		// if button 1 clicked, store the number, display it in the input
		// if switch calculated is on call clear display to make room for the new number to be entered - if calculated = true -> an operation was clicked
		// set storage mode to  "" and forget the previous operation
		let number1 = $("#button1").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number1.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.disable = false;
			storage.mode = "";
		});

		let number2 = $("#button2").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number2.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number3 = $("#button3").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number3.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number4 = $("#button4").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number4.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number5 = $("#button5").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number5.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number6 = $("#button6").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number6.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number7 = $("#button7").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number7.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number8 = $("#button8").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number8.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number9 = $("#button9").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number9.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		let number0 = $("#button0").click(function (){
			if (storage.calculated	=== true) {
				view.clearDisplay();
			}
			handlers.addNumber(number0.val());
			handlers.changeToNumber(storage.displayNumber);
			storage.mode = "";
			storage.disable = false;
		});

		// set up mode and last mode for adition, reset the display
		let add = $("#addButton").click(function (){
			if (storage.disable === true) {
				return;
			}
			storage.disable = true;
			if (storage.calculated === true) {
				$("#display").val(storage.numberOne);
				storage.mode = "a";
				storage.lastMode = "a";
				storage.displayNumber = [];
				storage.calculated = false;
				return;
			}

			// if storage mode is currently set, then reset it to current operation
			let result;
			if (storage.mode) {
				storage.mode = "a";
				storage.lastMode = "a";
				return;
			}

			// check last mode and depending on the answer calculate the previous 2 numbers, display the result and begin with addition
			if (storage.lastMode === "d") {

				storage.numberTwo = $("#display").val();
				result = operations.divide(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "s") {

				storage.numberTwo = $("#display").val();
				result = operations.subtract(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "m") {

				storage.numberTwo = $("#display").val();
				result = operations.multiply(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else {
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.addition(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}
			}
			storage.mode = "a";
			storage.lastMode = "a";
			storage.displayNumber = [];
		});

		let subtract = $("#subtractButton").click(function (){
			if (storage.disable === true) {
				return;
			}
			storage.disable = true;
			if (storage.calculated === true) {
				$("#display").val(storage.numberOne);
				storage.mode = "s";
				storage.lastMode = "s";
				storage.displayNumber = [];
				storage.calculated = false;
				return;
			}

			let result;
			if (storage.mode) {
				storage.mode = "s";
				storage.lastMode = "s";
				return;
			}

			if (storage.lastMode === "d") {

				storage.numberTwo = $("#display").val();
				result = operations.divide(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "m") {

				storage.numberTwo = $("#display").val();
				result = operations.multiply(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "a") {

				storage.numberTwo = $("#display").val();
				result = operations.addition(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else {
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.subtract(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}
			}
			storage.mode = "s";
			storage.lastMode = "s";
			storage.displayNumber = [];
		});

		let multiply = $("#multiplyButton").click(function (){
			if (storage.disable === true) {
				return;
			}
			storage.disable = true;
			if (storage.calculated === true) {
				$("#display").val(storage.numberOne);
				storage.mode = "m";
				storage.lastMode = "m";
				storage.displayNumber = [];
				storage.calculated = false;
				return;
			}

			let result;
			if (storage.mode) {
				storage.mode = "m";
				storage.lastMode = "m";
				return;
			}

			if (storage.lastMode === "d") {

				storage.numberTwo = $("#display").val();
				result = operations.divide(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "s") {

				storage.numberTwo = $("#display").val();
				result = operations.subtract(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "a") {

				storage.numberTwo = $("#display").val();
				result = operations.addition(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else {
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.multiply(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}
			}
			storage.mode = "m";
			storage.lastMode = "m";
			storage.displayNumber = [];
		});

		let divide = $("#divideButton").click(function (){
			if (storage.disable === true) {
				return;
			}
			storage.disable = true;
			if (storage.calculated === true) {
				$("#display").val(storage.numberOne);
				storage.mode = "d";
				storage.lastMode = "d";
				storage.displayNumber = [];
				storage.calculated = false;
				return;
			}
			let result;
			if (storage.mode) {
				storage.mode = "d";
				storage.lastMode = "d";
				return;
			}

			if (storage.lastMode === "m") {

				storage.numberTwo = $("#display").val();
				result = operations.multiply(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "s") {

				storage.numberTwo = $("#display").val();
				result = operations.subtract(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else if (storage.lastMode === "a") {

				storage.numberTwo = $("#display").val();
				result = operations.addition(storage.numberOne,storage.numberTwo);
				$("#display").val(result);
				storage.numberOne = result;

			} else {
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.divide(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}
			}
			storage.mode = "d";
			storage.lastMode = "d";
			storage.displayNumber = [];
		});

		// if user clicks clear, reset the calculator to default
		let clear = $("#clearButton").click(function (){
			view.clearDisplay();
		});

		// if equals then use the current opperand to calculate the numbers, 
		// if no new number is provided use the number that was last given and the operation that was last given
		let equals = $("#equalsButton").click(function (){
			if (storage.disable === true) {
				return;
			}

			if (storage.lastMode === "m") {
				let result;
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else if (storage.calculated === true) {
					result = operations.multiply(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.multiply(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}

				storage.mode = "m";
				storage.lastMode = "m";
				storage.displayNumber = [];

			} else if (storage.lastMode === "d") {
				let result;
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else if(storage.calculated === true){
					result = operations.divide(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.divide(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}

				storage.mode = "d";
				storage.lastMode = "d";
				storage.displayNumber = [];

			} else if (storage.lastMode === "s") {
				let result;
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else if(storage.calculated === true){
					result = operations.subtract(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.subtract(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}

				storage.mode = "s";
				storage.lastMode = "s";
				storage.displayNumber = [];

			} else if (storage.lastMode === "a") {
				let result;
				if (storage.numberOne === undefined) {
					storage.numberOne = $("#display").val();
				} else if(storage.calculated === true){
					result = operations.addition(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				} else {
					storage.numberTwo = $("#display").val();
					result = operations.addition(storage.numberOne,storage.numberTwo);
					$("#display").val(result);
					storage.numberOne = result;
				}

				storage.mode = "a";
				storage.lastMode = "a";
				storage.displayNumber = [];
			}

			storage.calculated = true;
			storage.mode = "";
			storage.displayNumber = [];
		});		
	},

	// this function resets the storage to default
	clearDisplay: function() {
		$("#display").val("");
		storage.numberOne = undefined;
		storage.numberTwo = undefined;
		storage.displayNumber = [];
		storage.mode = "";
		storage.lastMode = "";
		storage.calculated = false;
		storage.disable = true
	}
}
view.setUpEventListener();