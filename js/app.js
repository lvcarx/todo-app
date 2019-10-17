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
const submitButton = document.getElementById('submit');
var input = document.getElementById("box");


if (localStorage.getItem("task:1") === null) {
    counter = localStorage.setItem('counter', JSON.stringify(counter));
}

counter = localStorage.getItem('counter', JSON.stringify(counter));




// increase counter function

function increaseCounteronenter() {

    if (event.keyCode === 13 ) {
        localStorage.getItem('counter', JSON.stringify(counter));
        counter += 1;
        localStorage.setItem('counter', JSON.stringify(counter));
        form.reset();
    }

}

function increaseCounteronclick() {

        localStorage.getItem('counter', JSON.stringify(counter));
        counter += 1;
        localStorage.setItem('counter', JSON.stringify(counter));
        form.reset();
    
}

// increase counter

document.addEventListener('keyup', increaseCounteronenter, false);
submitButton.addEventListener('click', increaseCounteronclick, false);




counter = JSON.parse(window.localStorage.getItem('counter'));

let items = [];
   
function setItems() {

  boxvalue = document.getElementById('box').value;

  if (boxvalue.length > 1) {

    localStorage.setItem('task:' + counter, JSON.stringify(items));
    items.push(boxvalue);  
    localStorage.setItem('task:' + counter, JSON.stringify(items));
    items = [];
    return false; 

  }

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



// function to add items to list on enter

function addItemsToListonenter() {

    if (event.keyCode === 13) {
        if (boxvalue.length > 1) {  
            createList();    
        } else {
            const errorNotice = document.getElementById('errorNotice');
            errorNotice.textContent = "You have to write something!";
        }
    }

}

// function to add items to list on click

function addItemsToListonclick() {

        if (boxvalue.length > 1) {  
            createList();    
        } else {
            const errorNotice = document.getElementById('errorNotice');
            errorNotice.textContent = "You have to write something!";
        }

}

document.addEventListener('keyup', addItemsToListonenter, false);
submitButton.addEventListener('click', addItemsToListonclick, false);




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



// SORTABLE JS config

var el = document.getElementById('todoItems');
var sortable = new Sortable(el, {
	animation: 150,

});


// settings modal

const modal = document.getElementsByClassName('modal');

for (var i = 0; i < modal.length; i++) {

    const createCloseModal = document.createElement("a");
    const closeImg = document.createElement("img");
    closeImg.setAttribute("src", "/img/close.svg");
    closeImg.setAttribute("id", "close");
    closeImg.setAttribute("onclick", "closeModal()");
    createCloseModal.classList.add('close');
    modal[i].appendChild(createCloseModal);
    createCloseModal.appendChild(closeImg)

}

// settings modal toggle


function openFunction(item) {

    item.classList.add('opened');

}

/* function closeFunction(item) {

    item.classList.remove('opened');

} */

function openModal() {

    const settingsModal = document.getElementById('settingsModal'); 
    settingsModal.addEventListener('click', openFunction(settingsModal), false)

}



function closeModal() {

    const modal = document.getElementsByClassName('modal');

    for (var i = 0; i < modal.length; i++) {

        modal[i].classList.remove('opened');

    }

}

// actual toggles

// open

const settings = document.getElementById('settings');
settings.addEventListener('click', openModal, false);

// close

const test = document.getElementById('close');
test.addEventListener('click', closeModal, false);

