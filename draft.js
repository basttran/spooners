conditions = [
  {
    code: "(x**3 + 6)*7",
    inputQuestion: "if x===2 this expression will return ...",
    inputAnswer: "91",
    outputQuestion: "which value of x makes this expression return 42",
    outputAnswer: "0",
    solved: false
  },
  {
    code: "x%11",
    inputQuestion: "if 'x===80' this expression will return ...",
    inputAnswer: "3",
    outputQuestion: "provide a value for x so that it returns 9",
    outputAnswer: "20",
    solved: false
  },
  {
    code: "Empty",
    inputQuestion: "Empty",
    inputAnswer: "",
    outputQuestion: "Empty",
    outputAnswer: "",
    solved: false
  }
];

var condSlotCode = document.querySelector(".condition-jscode");
var condSlotInput = document.querySelector(".condition-input");
var condSlotOutput = document.querySelector(".condition-output");
condSlotCode.innerHTML = conditions[0].code;
condSlotInput.innerHTML = conditions[0].inputQuestion;
condSlotOutput.innerHTML = conditions[0].outputQuestion;

itin.addEventListener("input", function(evt) {
  checkConditions();
});
itout.addEventListener("input", function(evt) {
  checkConditions();
});

function checkConditions() {
  var itin = document.getElementById("coin");
  var itout = document.getElementById("coout");
  if (
    itin.value == conditions[0].inputAnswer &&
    itout.value == conditions[0].outputAnswer
  ) {
    ship.mun += 5;
    conditions.shift();
    coin.value = "";
    coout.value = "";
    condSlotCode.innerHTML = conditions[0].code;
    condSlotInput.innerHTML = conditions[0].inputQuestion;
    condSlotOutput.innerHTML = conditions[0].outputQuestion;
  }
}
