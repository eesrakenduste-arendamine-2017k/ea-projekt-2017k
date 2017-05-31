window.onload = function(){
  document.getElementById("rep1_minus").addEventListener("click", rep1Minus);
  document.getElementById("rep2_minus").addEventListener("click", rep2Minus);
  document.getElementById("rep3_minus").addEventListener("click", rep3Minus);
  document.getElementById("rep1_plus").addEventListener("click", rep1Plus);
  document.getElementById("rep2_plus").addEventListener("click", rep2Plus);
  document.getElementById("rep3_plus").addEventListener("click", rep3Plus);
};

rep1Minus = function(){
  var currentValue = parseInt(document.getElementById("rep1_x").value);
  var newValue;
  if (currentValue<=1) {
    newValue= 1;
  } else {
    newValue = currentValue -1;
  }
  document.getElementById("rep1_x").value = newValue;
};

rep2Minus = function(){
  var currentValue = parseInt(document.getElementById("rep2_x").value);
  var newValue;
  if (currentValue<=1) {
    newValue= 1;
  } else {
    newValue = currentValue -1;
  }
  document.getElementById("rep2_x").value = newValue;
};

rep3Minus = function(){
  var currentValue = parseInt(document.getElementById("rep3_x").value);
  var newValue;
  if (currentValue<=1) {
    newValue= 1;
  } else {
    newValue = currentValue -1;
  }
  document.getElementById("rep3_x").value = newValue;
};

rep1Plus = function(){
  var currentValue = parseInt(document.getElementById("rep1_x").value);
  var newValue;
  if (currentValue>=40) {
    newValue= 40;
  } else {
    newValue = currentValue +1;
  }
  document.getElementById("rep1_x").value = newValue;
};

rep2Plus = function(){
  var currentValue = parseInt(document.getElementById("rep2_x").value);
  var newValue;
  if (currentValue>=40) {
    newValue= 40;
  } else {
    newValue = currentValue +1;
  }
  document.getElementById("rep2_x").value = newValue;
};

rep3Plus = function(){
  var currentValue = parseInt(document.getElementById("rep3_x").value);
  var newValue;
  if (currentValue>=40) {
    newValue= 40;
  } else {
    newValue = currentValue +1;
  }
  document.getElementById("rep3_x").value = newValue;
};
