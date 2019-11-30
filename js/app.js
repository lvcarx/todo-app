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
const actionAreaSwitcher = document.getElementsByClassName("actionArea");

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
    
    var node = document.createTextNode(tasks);
    


        const textWrapper = document.createElement("a");
        textWrapper.setAttribute("class", "textWrapper");
    
        const edit = document.createElement("a");
        edit.innerText = "Edit";
        edit.setAttribute("class", "edit");  
        edit.setAttribute("id", "edit"); 
        edit.setAttribute("onclick", "focuseItem(this)");

        const actionArea  = document.createElement("a");
        actionArea.setAttribute("class", "actionArea");   
        actionArea.setAttribute("id", "actionArea");  

        const handleButtons = document.createElement("a");
        handleButtons.setAttribute("class", "handle");
        

        const deleteButtons = document.createElement("a");
        deleteButtons.innerText = "Delete";
        deleteButtons.setAttribute("id", "delete");
        deleteButtons.setAttribute("class", "button delete");
        deleteButtons.setAttribute("onclick", "removeListItem(this)");
    
        const favoriteButtons = document.createElement("a");
        favoriteButtons.innerText = "Favorite";
        favoriteButtons.setAttribute("id", "favorite");
        favoriteButtons.setAttribute("onclick", "addFavorite()");
        favoriteButtons.setAttribute("class", "button favoriteButton");
        favoriteButtons.setAttribute("onclick", "favoriteListItem(this)");
        

        para.appendChild(textWrapper);
        para.appendChild(edit);
        textWrapper.appendChild(node);
        para.appendChild(actionArea);
        actionArea.appendChild(handleButtons);
        actionArea.appendChild(deleteButtons);
        actionArea.appendChild(favoriteButtons);
        
        // para.appendChild(node);
        element.appendChild(para);


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
        
        var node = document.createTextNode(value);
        // para.appendChild(node);
        // element.appendChild(para);

        const textWrapper = document.createElement("a");
        textWrapper.setAttribute("class", "textWrapper");
    
        const edit = document.createElement("a");
        edit.innerText = "Edit";
        edit.setAttribute("class", "edit");  
        edit.setAttribute("id", "edit"); 
        edit.setAttribute("onclick", "focuseItem(this)");

        const actionArea  = document.createElement("a");
        actionArea.setAttribute("class", "actionArea");   
        actionArea.setAttribute("id", "actionArea");  

        const handleButtons = document.createElement("a");
        handleButtons.setAttribute("class", "handle");

        const checkButton = document.createElement("a");
        //deleteButtons.innerText = "Delete";
        checkButton.setAttribute("id", "check");
        checkButton.setAttribute("class", "check");
        checkButton.setAttribute("onclick", "checkListItem(this)");        

        const deleteButtons = document.createElement("a");
        //deleteButtons.innerText = "Delete";
        deleteButtons.setAttribute("id", "delete");
        deleteButtons.setAttribute("class", "button delete");
        deleteButtons.setAttribute("onclick", "removeListItem(this)");
    
        const favoriteButtons = document.createElement("a");
        // favoriteButtons.innerText = "Favorite";
        favoriteButtons.setAttribute("id", "favorite");
        favoriteButtons.setAttribute("onclick", "addFavorite()");
        favoriteButtons.setAttribute("class", "button favoriteButton");
        favoriteButtons.setAttribute("onclick", "favoriteListItem(this)");
        
        actionArea.appendChild(checkButton);
        para.appendChild(textWrapper);
        para.appendChild(edit);
        
        textWrapper.appendChild(node);
        para.appendChild(actionArea);
        actionArea.appendChild(handleButtons);
        actionArea.appendChild(deleteButtons);
        actionArea.appendChild(favoriteButtons);
        
        // para.appendChild(node);
        element.appendChild(para);


    }

}

}

window.onload = createInitialList;



// FAVORITE Function

function addFavorite() {

    console.log('test');



  
}


const favoriteButtons = document.getElementsByClassName("favoriteButton");

for (var i = 0; i < favoriteButtons.length; i++) {

    favoriteButtons[i].addEventListener('click', function (event) {
		console.log('clicked');
	}, false);

}


// dynamic advice wrapper 

/**const advice = document.getElementById("advice");

if (counter > 1) {

    advice.textContent = "click on item to remove it";

} else {

    advice.textContent = "enter items";

}
*/

// actionArea
for (var i = 0; i < actionAreaSwitcher.length; i++) {

    actionAreaSwitcher[i].addEventListener("click", function(event) {

        console.log('test');
        actionAreaSwitcher[i].classList.add("test");

    }, false);

}   

// remove item functionality

function removeListItem(obj) {
    
    obj.parentNode.parentNode.remove();
    localStorage.removeItem(obj.parentNode.parentNode.classList[1]);
    
}

function focuseItem(obj) {
    obj.parentNode.classList.toggle('opened'); 
}

// favorite item functionality 

function favoriteListItem(obj) {
    obj.parentNode.parentNode.classList.toggle('favoriteItem'); 
}

// check item functionality

var myVar;

function checkListItem(obj) {

    obj.parentNode.parentNode.classList.add('removed');

    setTimeout(function() { 
        obj.parentNode.parentNode.remove();
        localStorage.removeItem(obj.parentNode.parentNode.classList[1]);
    }, 2000);

    // myVar = setTimeout(removeListItem, 55000);
    //obj.parentNode.parentNode.remove();
    // localStorage.removeItem(obj.parentNode.parentNode.classList[1]);

}

// reset functionality

const resetButton = document.getElementById('reset');

function resetItems() {

    localStorage.clear();
    element.innerHTML = "";
    counter = 1;

}


resetButton.addEventListener("click", resetItems, false);


// reset modal

function openDeleteModal() {

    const deleteModal = document.getElementById('deleteModal'); 
    deleteModal.addEventListener('click', openFunction(deleteModal), false)

}

const openResetModal = document.getElementById('openResetModal');
openResetModal.addEventListener('click', openDeleteModal, false);



// SORTABLE JS config

var el = document.getElementById('todoItems');
var sortable = new Sortable(el, {
	animation: 150,
    handle: '.handle', // handle's class
});


// settings modal

const modal = document.getElementsByClassName('modal');

for (var i = 0; i < modal.length; i++) {

    const createCloseModal = document.createElement("a");
    // const closeImg = document.createElement("img");
    // closeImg.setAttribute("src", "/img/close.svg");
    createCloseModal.setAttribute("id", "close");
    createCloseModal.setAttribute("onclick", "closeModal()");
    createCloseModal.classList.add('close');
    modal[i].prepend(createCloseModal);
    // createCloseModal.appendChild(closeImg)

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






// right click

/* 

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      alert("You've tried to open context menu"); //here you draw your own menu
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      alert("You've tried to open context menu");
      window.event.returnValue = false;
    });
  }

*/