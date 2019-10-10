if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .catch(function(err) {
      console.error(err);
    });
  }

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
    para.setAttribute("onclick", "removeListItem(this)");
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
        para.classList.add("listElement", key);
        para.setAttribute("onclick", "removeListItem(this)");
        var node = document.createTextNode(value);
        para.appendChild(node);
        element.appendChild(para);


    }

}

}

window.onload = createInitialList;

// dynamic advice wrapper 

const advice = document.getElementById("advice");

if (counter > 1) {

    advice.textContent = "click on item to remove it";

} else {

    advice.textContent = "enter items";

}


// remove item functionality

function removeListItem(obj) {

    console.log(obj.classList[1]);
    localStorage.removeItem(obj.classList[1]);

    document.getElementById("todoItems").addEventListener("click",function(e) {
        var tgt = e.target;
        if (tgt.tagName.toUpperCase() == "LI") {
          tgt.parentNode.removeChild(tgt); // or tgt.remove();
        }
      });

}


// reset functionality

const resetButton = document.getElementById('reset');

function resetItems() {

    localStorage.clear();
    element.innerHTML = "";
    counter = 1;

}

resetButton.addEventListener("click", resetItems, false);




 var el = document.getElementById('todoItems');
 var sortable = Sortable.create(el);

