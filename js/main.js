var btn_generation = document.getElementById("btn_generateLoot");
// var outputContainer = document.getElementById("output_dm");

btn_generation.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();

  // ourRequest.open('GET', 'https://botchedrole.github.io/MyAttempts/generated_data.json');
  ourRequest.open('GET', 'http://127.0.0.1:8000/generated_data.json');
  
  ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    displayResults(ourData);
  };

  ourRequest.onerror = function() {
    console.log("There was an error.")
  }
  
  ourRequest.send();

})

function displayResults(data) {
  var rawTemplate_dm = document.getElementById("result_entry_dm").innerHTML;
  var compiledTemplate_dm = Handlebars.compile(rawTemplate_dm);
  var generatedHTML_dm = compiledTemplate_dm(data);

  var result_container_dm = document.getElementById("output_dm");
  result_container_dm.innerHTML += generatedHTML_dm;


  var rawTemplate_player = document.getElementById("result_entry_player").innerHTML;
  var compiledTemplate_player = Handlebars.compile(rawTemplate_player);
  var generatedHTML_player = compiledTemplate_player(data);

  var result_container_player = document.getElementById("output_player");
  result_container_player.innerHTML += generatedHTML_player;
}



// Handlebar Helpers

Handlebars.registerHelper("compare", function(value_1, operator, value_2, options) {
  var operators, result;
  if (arguments.length < 3)
    throw new Error("Handlebars Helper ifEqual needs 2 parameters");
  if (options === undefined) {
    options = value_2;
    value_2 = operator;
    operator = "===";
  }

  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; }
  };

  if (!operators[operator]) {
    throw new Error("Handlebars Helper 'compare' doesn't know the operator" + operator);
  }

  result = operators[operator](value_1, value_2);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// function renderHTML(data) {
//   var htmlString = "";

//   // for (i = 0; i < data.length; i++) {
//   //   htmlString += "<p>" + data.lootTable[i]
//   // }

//   for (var key in data) {
//     htmlString = "key: "+key
//     htmlString += " " + data[key].item
//     // for (ii = 0; ii < data[key].item.length; ii++) {
//     //   htmlString += " " + data[key].item[ii];
//     // }
//   }
//   outputContainer.insertAdjacentHTML('beforeend', htmlString)
// }


// https://learnwebcode.github.io/json-example/animals-1.json
// console.log(ourData["lootTable"])
