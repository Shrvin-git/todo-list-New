// گرفتن المان‌های اصلی از DOM
const todoText = document.getElementById("todo-text");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("due-date");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const clearAllBtn = document.getElementById("clear-all");

// افزودن تودو
let todosArray = []

function newTodo() {
  const text = todoText.value.trim();
  const selectedPriority = priority.value;
  const date = dueDate.value;

  let priorityText = selectedPriority === "important" ? "(مهم)" : "(کم اهمیت)"

  let newTodoObj = {
    id: todosArray.length + 1,
    title: text,
    todoPriority: priorityText,
    dateTodo: date
  }

  todosArray.push(newTodoObj)
  setLocalStorage(todosArray)
  todosGenerator(todosArray)
  text.value = ''

}
function setLocalStorage(allTodosArray) {
  localStorage.setItem('todos', JSON.stringify(allTodosArray))
}
function todosGenerator(allTodosArray) {

  todoList.innerHTML = ''


  allTodosArray.forEach(todo => {


    if (todo.title == '' || todo.priorityText == '' || todo.date == '') {
      alert('لطفا همه ورودی هارا پر کنید')
    }

    else {
      let listtodoWrapper = document.createElement('li')
      listtodoWrapper.classList.add('todo-item')

      let spanTitle = document.createElement('span')
      spanTitle.classList.add('text')
      spanTitle.innerHTML = todo.title + ' ' + todo.todoPriority

      let spanDate = document.createElement('span')
      spanDate.classList.add('date')
      spanDate.innerHTML = todo.dateTodo

      let todoComplete = document.createElement('button')
      todoComplete.classList.add('done-btn')
      todoComplete.innerHTML = '✅'
      todoComplete.setAttribute('onClick', 'doneTodo(' + todo.id + ')')

      let todoDelete = document.createElement('button')
      todoDelete.classList.add('delete-btn')
      todoDelete.innerHTML = '❌'
      todoDelete.setAttribute('onClick', 'deleteTodo(' + todo.id + ')')

      listtodoWrapper.append(spanTitle, spanDate, todoComplete, todoDelete)
      todoList.append(listtodoWrapper)
    }

  });

}
function getLocalStorage() {
  let getItem = JSON.parse(localStorage.getItem('todos'))
  if (getItem) {
    todosArray = getItem
  }
  else {
    todosArray = []
  }
  todosGenerator(todosArray)
}
function clearAll() {
  localStorage.removeItem('todos')
  todosArray = []

  todosGenerator(todosArray)
}
function doneTodo(todoId) {

  let getItem = JSON.parse(localStorage.getItem('todos'))
  todosArray = getItem

  todosArray.forEach(function (todo) {



  })

}
function deleteTodo(todoId) {
  let getItem = JSON.parse(localStorage.getItem('todos'))
  todosArray = getItem

  let mainIndex = todosArray.findIndex(function (todo) {
    return todo.id === todoId
  })

  todosArray.splice(mainIndex, 1)
  setLocalStorage(todosArray)
  todosGenerator(todosArray)
}


addTodoBtn.addEventListener('click', newTodo)
window.addEventListener('load', getLocalStorage)
clearAllBtn.addEventListener('click', clearAll)





