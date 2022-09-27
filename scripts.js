"use strict";

let calculator = {
  temp: null,
  result: null,

  initialize() {
    document.querySelectorAll(".button").forEach((btn) => {
      btn.addEventListener("click", this.input.mouseInput.bind(calculator));
    });
  },

  input: {
    mouseInput() {
      console.log(arguments);
      this.temp = arguments[0].target.value;
    },
  },

  display: {},

  calculation: {},
};

// initialize calculator...
// listen for any key
calculator.initialize();
