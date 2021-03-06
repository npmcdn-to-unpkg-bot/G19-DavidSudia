// ** globals ** //
var todoHTML = '<h2 class="removeWidget">ToDo List</h2><hr><br><form><div class="form-group"><input type="text" class="form-control" id="todoInput" placeholder="Enter your task..."><label><input id="big-task" type="radio" name="task-size" value="">&nbsp;Big Task</label>&nbsp;&nbsp;<label><input id="med-task" type="radio" name="task-size" value="">&nbsp;Medium Task</label>&nbsp;&nbsp;<label><input id="small-task" type="radio" name="task-size" value="">&nbsp;Small Task</label></div><button type="submit" id="todoSubmit" class="btn btn-info">Submit</button></form><div id="beforeTodos"><h3>Your ToDos</h3><hr></div><div id="todoSection" class="todoContainer"></div>';

var seed = ['<div class="todos box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;You have no todos!</div>'];


// ** dom manipulation ** //
function todoListCreation () {
  // seed data to local storage
  seedDataToLocalStorage();

  // grab data from local storage
  var allYourTodos = getDataFromLocalStorage();

  // append data to the dom
  appendToDom(allYourTodos);
  // handle form submission
  $('form').off('click', '#todoSubmit').on('click', '#todoSubmit', function(event) {
    event.preventDefault();
    var todo = $('input').val();

    var bigTodo = '<div class="todos bTodo box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</div>';

    var medTodo = '<div class="todos mTodo box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</div>';

    var smallTodo = '<div class="todos sTodo box-shadow bottom-margin"><button class="btn btn-success btn-sm">&#10003</button>&nbsp;'+todo+'</div>';

    // add new todo to the dom, seed to local storage, and adjust layout
    if ($("#big-task").is(":checked")) {
      console.log(todo);
      $('#todoSection').append(bigTodo);
      seedDataToLocalStorage(bigTodo);
      msnry.layout();
    } else if ($("#med-task").is(":checked")) {
      $('#todoSection').append(medTodo);
      seedDataToLocalStorage(medTodo);
      msnry.layout();
    } else if ($("#small-task").is(":checked")) {
      $('#todoSection').append(smallTodo);
      seedDataToLocalStorage(smallTodo);
      msnry.layout();
    }
    // clear input
    $('input').val('');
  });

  // remove a todo
  $(document).on('click', '.todos', function() {
    $(this).remove();
    var strTodo = ($(this).text()).replace(/X/g, '').trim();
    // remove todo from localstorage
    removeTodoFromLocalStorage(strTodo);
    msnry.layout();
  });
}

// ** helper functions ** //

// sends things to local storage once they've been entered and stores as JSON object
function seedDataToLocalStorage(todo) {
  if (todo) {
    var currentData = getDataFromLocalStorage();
    currentData.push(todo);
    localStorage.setItem('todos', JSON.stringify(currentData));
  }
  if(!getDataFromLocalStorage()) {
    localStorage.setItem('todos', JSON.stringify(seed));
  }
}


// retrieves data from local storage and parses the JSON object
function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('todos'));
}


// appends todos to the DOM
function appendToDom(arr) {
  arr.forEach(function(todo){
    $('#todoSection').append(todo);
  });
}

// removes todos from local storage
function removeTodoFromLocalStorage(todo) {
  /*
  1. get data from local storage
  2. find item in array and remove
    'one'
    ['one', 'two', 'three']
  3. set data to local storage
  */
  var current = getDataFromLocalStorage();
  console.log(current);
  var startIndex = current.indexOf(todo);
  console.log(startIndex);
  current.splice(startIndex, 1);
  console.log(current);
  localStorage.setItem('todos', JSON.stringify(current));
}
