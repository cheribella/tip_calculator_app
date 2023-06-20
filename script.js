//Calling root from styles
const rootStyles = getComputedStyle(document.documentElement);

//Global Variables
const toggleSwitch = document.getElementById("toggle-switch"); //nightmode
const $resetBtn = document.getElementById("reset"); //reset
const $inputs = document.querySelectorAll("input"); //ALL input
const $bill = document.querySelector(".bill"); //bill input
const $numberOfPeople = document.querySelector(".number-of-people"); //no of people input
const $errorMessage = document.querySelector(".input-zero"); //error message if no of people = 0
const $buttonTipPercentage = document.querySelectorAll(".tip-button"); //tip buttons
const $buttonSelected = document.getElementsByClassName("active"); //selected button
const $customTipPercentage = document.querySelector(".tip-custom"); //custom tip input
//outputs below
const $resultTip = document.querySelector(".tip-amount-price");
const $resultTotal = document.querySelector(".total-amount-price");

//NIGHT MODE
toggleSwitch.addEventListener("change", () => {
  const $body = document.body;
  const $calculator = document.getElementById("tip-calculator");
  const $tipPercent = document.getElementsByClassName("tip-percent-container");
  const $result = document.getElementsByClassName("result");
  const $attribution = document.getElementsByClassName("attribution");
  const $logo = document.getElementById("logo");
  const $icon = document.getElementsByClassName("icon");

  if (toggleSwitch.checked) {
    $body.classList.add("night-mode");
    $calculator.classList.add("night-mode");
    $tipPercent[0].classList.add("night-mode");
    $result[0].classList.add("night-mode");
    $attribution[0].classList.add("night-mode");
    $icon[0].classList.add("night-mode");
    $icon[1].classList.add("night-mode");
    $logo.classList.add("night-mode");
  } else {
    $body.classList.remove("night-mode");
    $calculator.classList.remove("night-mode");
    $tipPercent[0].classList.remove("night-mode");
    $result[0].classList.remove("night-mode");
    $attribution[0].classList.remove("night-mode");
    $icon[0].classList.remove("night-mode");
    $icon[1].classList.remove("night-mode");
    $logo.classList.remove("night-mode");
  }
});

$resetBtn.disabled = true;
$resultTip.innerText = "0.00";
$resultTotal.innerText = "0.00";
//Reset all values
$resetBtn.addEventListener("click", () => {
  $resetBtn.disabled = true;
  $errorMessage.innerText = "";

  $resultTip.innerText = "0.00";
  $resultTotal.innerText = "0.00";

  $inputs.forEach((input) => {
    input.value = "";
  });
});

//This function serves as a checker whether an input is empty or not
function isEmpty() {
  if (
    $bill.value === "" ||
    $numberOfPeople.value <= 0 ||
    $customTipPercentage.value === ""
  ) {
    $resetBtn.disabled = true;
    $resetBtn.classList.remove("reset-active");
    console.log("ERROR: Input empty");
  } else {
    $resetBtn.disabled = false;
    $resetBtn.classList.add("reset-active");
    console.log("STATUS: OK");
  }
  if ($numberOfPeople.value <= 0) {
    $numberOfPeople.style.borderColor = "var(--rose)";
    $errorMessage.style.visibility = "visible";
    console.log("ERROR: Number of People cannot be 0");
  } else {
    $numberOfPeople.style.borderColor = "";
    $errorMessage.style.visibility = "hidden";
  }
}

for (var i = 0; i < $inputs.length; i++) {
  $inputs[i].addEventListener("input", isEmpty);
}

$buttonTipPercentage.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    $buttonTipPercentage.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");
    $resetBtn.disabled = false;
    $resetBtn.classList.add("reset-active");
    calculate();
  });
});

$customTipPercentage.addEventListener("input", () => {
  calculate();
});

//Calculations
function calculate() {
  let tipPercentage;

  if ($customTipPercentage.value !== "") {
    tipPercentage = parseFloat($customTipPercentage.value);
  } else if ($buttonSelected.length > 0) {
    tipPercentage = parseFloat($buttonSelected[0].value);
  } else {
    tipPercentage = 0;
  }

  // Parse the values as numbers
  const billAmount = parseFloat($bill.value);
  const numberOfPeople = parseFloat($numberOfPeople.value);

  if (isNaN(billAmount) || isNaN(numberOfPeople)) {
    // Input values are not valid numbers
    $resultTip.innerText = "0.00";
    $resultTotal.innerText = "0.00";
  } else {
    // Calculate and display the results
    let totalPerPerson =
      (billAmount + billAmount * tipPercentage) / numberOfPeople;
    let tipPerPerson = (billAmount / numberOfPeople) * tipPercentage;
    totalPerPerson = totalPerPerson.toFixed(2);
    tipPerPerson = tipPerPerson.toFixed(2);

    $resultTip.innerText = tipPerPerson;
    $resultTotal.innerText = totalPerPerson;
  }

  console.log($resultTotal.innerText);
  console.log($resultTip.innerText);
  console.log(tipPercentage);
}

calculate();
