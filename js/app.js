



let counter = 1;
var element = document.getElementById("todoItems");
const form = document.getElementById("form");

if (localStorage.getItem("task:1") === null) {
    counter = localStorage.setItem('counter', JSON.stringify(counter));
}

counter = localStorage.getItem('counter', JSON.stringify(counter));

document.addEventListener('keyup', function(event) {

    if (event.keyCode === 13) {
        localStorage.getItem('counter', JSON.stringify(counter));
        counter += 1;
        localStorage.setItem('counter', JSON.stringify(counter));
        console.log(counter);
        form.reset();

    }

});

counter = JSON.parse(window.localStorage.getItem('counter'));

let items = [];
var input = document.getElementById("box");
   
function setItems() {

  localStorage.setItem('task:' + counter, JSON.stringify(items));
  boxvalue = document.getElementById('box').value;
  items.push(boxvalue);  
  localStorage.setItem('task:' + counter, JSON.stringify(items));
  items = [];

  return false; 

}

function createList() {
    
    var tasks = JSON.parse(window.localStorage.getItem('task:' + (counter - 1)));
    var para = document.createElement("li");
    para.className = "listElement" + counter;
    var node = document.createTextNode(tasks);
    para.appendChild(node);
    element.appendChild(para);
    
    var para2 = document.createElement("a");
    para.appendChild(para2);
    para2.className = "test" + counter;

}

document.addEventListener('keyup', function(event) {

    if (event.keyCode === 13) {
        createList();    
    }

});

function createInitialList() {

    for (var i = 0; i < localStorage.length; i++) {

        // set iteration key name
        var key = localStorage.key(i);
      
        // use key name to retrieve the corresponding value
        var value = JSON.parse(localStorage.getItem(key));
      
        // console.log the iteration key and value
        console.log('Key: ' + key + ', Value: ' + value);  
     
        if (key !== 'counter') {

        var para = document.createElement("li");
        para.className = "listElement";
        var node = document.createTextNode(value);
        para.appendChild(node);
        element.appendChild(para);

        var para2 = document.createElement("a");
        para.appendChild(para2);
        para2.className = "test";


    }

}

}

window.onload = createInitialList;

const resetButton = document.getElementById('reset');


// remove item functionality

document.querySelectorAll(".listElement").forEach(item => {
    item.addEventListener('click', event => {
      item.classList.add('opened');
    })
});


function addClassName() {

    listEl.classList.add("test");

}

const listEl = document.querySelector(".listElement").addEventListener("click", addClassName, false);




// reset functionality

function resetItems() {

    localStorage.clear();
    element.innerHTML = "";
    counter = 1;

}

resetButton.addEventListener("click", resetItems, false);
