/**if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .catch(function (err) {
            console.error(err);
        });
}
*/
let item;
let textWrapper;
let edit;
let node;
let actionArea;
let handleButtons;
let checkButton;
let deleteButtons;
let favoriteButtons;

let counter = 0;
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

    if (event.keyCode === 13) {
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
    item = document.createElement("li");
    item.className = "listElement" + counter;

    node = document.createTextNode(tasks);

    textWrapper = document.createElement("a");
    textWrapper.setAttribute("class", "textWrapper");

    createItemIcons();
    appendItems();


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




// FAVORITE Function

function addFavorite() {

    console.log('test');

}


favoriteButtons = document.getElementsByClassName("favoriteButton");

for (var i = 0; i < favoriteButtons.length; i++) {

    favoriteButtons[i].addEventListener('click', function (event) {
        console.log('clicked');
    }, false);

}


// actionArea
for (var i = 0; i < actionAreaSwitcher.length; i++) {

    actionAreaSwitcher[i].addEventListener("click", function (event) {

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
    //let first = obj.parentNode.parentNode.classList[1];
    //let isItFav = first + 'isItFav';
    if (localStorage.getItem(obj.parentNode.parentNode.classList[1] + 'isItFav') === null) {
        localStorage.setItem(obj.parentNode.parentNode.classList[1] + 'isItFav', 'true');
    }
}

// check item functionality

var myVar;

function checkListItem(obj) {

    obj.parentNode.classList.add('removed');

    setTimeout(function () {
        obj.parentNode.remove();
        localStorage.removeItem(obj.parentNode.classList[1]);
    }, 2000);
    
}

// reset functionality

const resetButton = document.getElementById('reset');
console.log(counter.length);
function resetItems() {
    console.log(counter);
    //localStorage.clear();
    for (let i; i < counter; i++) {
        localStorage.removeItem('task:' + counter[i]);
    }

    if (localStorage.contains("task")) {
        console.log("this works");
    }

    element.innerHTML = "";
    counter = 1;

}

const abortButton = document.getElementById('abort');

function abortModal(event) {

    event.target.parentNode.parentNode.classList.remove('opened');

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

var today = document.getElementById('todoItems');
var sortable = new Sortable(today, {
    animation: 150,
    group: 'shared',
    handle: '.handle', // handle's class
});

var pending = document.getElementById('pendingTodoItems');
var sortable = new Sortable(pending, {
    animation: 150,
    group: 'shared',
    handle: '.handle', // handle's class
});


// settings modal

const modal = document.getElementsByClassName('modal');

for (var i = 0; i < modal.length; i++) {

    const createCloseModal = document.createElement("a");
    const closeImg = document.createElement("img");
    //closeImg.setAttribute("src", "../img/close.svg");
    createCloseModal.setAttribute("id", "close");
    createCloseModal.setAttribute("onclick", "closeModal()");
    createCloseModal.classList.add('close');
    createCloseModal.appendChild(closeImg);
    modal[i].prepend(createCloseModal);
    
}

// settings modal toggle


function openFunction(element) {

    element.classList.add('opened');

}

/*function closeFunction(e) {

    e.classList.remove('opened');

} */

function openModal() {

    console.log('settings will be opened');
    const settingsModal = document.getElementById('settingsModal');
    settingsModal.addEventListener('click', openFunction(settingsModal), false)

}



function closeModal() {

    const modal = document.getElementsByClassName('modal');

    for (var i = 0; i < modal.length; i++) {

        modal[i].classList.remove('opened');

    }

}

// open

let settings = document.getElementById('settings');
console.log("yep" + settings);
settings.addEventListener('click', openModal, false);

// close

const test = document.getElementById('close');
test.addEventListener('click', closeModal, false);


// implement saving clicking start modal away 

function saveToLocalStorage() {

    let startModalHide = true;
    localStorage.setItem('startModalHide', startModalHide);

}

isStartModalHidden = localStorage.getItem('startModalHide');

if (isStartModalHidden) {



} else {

    const startModal = document.getElementById('startModal');
    startModal.classList.add('opened');

}

const startModalClose = document.getElementById('startModalClose');
startModalClose.addEventListener('click', saveToLocalStorage, false);





(function createInitialList() {

    for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(key);
        if (key !== 'counter' && key !== 'startModalHide') {
            // TODO: if (localStorage.hasOwnProperty("task:" + [i])) 
            if (key.includes('isItFav') == false) {
                // use key name to retrieve the corresponding value
                var value = JSON.parse(localStorage.getItem(key));

                item = document.createElement("li");
                item.classList.add("listElement", key);

                node = document.createTextNode(value);

                textWrapper = document.createElement("a");
                textWrapper.setAttribute("class", "textWrapper");

                createItemIcons();
                appendItems();
            }

        } else {
            console.log('didnt work' + i);
        }
    }
})();

/**
 * this function creates the subelements of an item
 * 
 * 
 */
function createItemIcons() {

    edit = document.createElement("a");
    edit.innerText = "Edit";
    edit.setAttribute("class", "edit");
    edit.setAttribute("id", "edit");
    edit.setAttribute("onclick", "focuseItem(this)");

    actionArea = document.createElement("a");
    actionArea.setAttribute("class", "actionArea");
    actionArea.setAttribute("id", "actionArea");

    handleButtons = document.createElement("a");
    handleButtons.setAttribute("class", "handle");

    checkButton = document.createElement("a");
    checkButton.setAttribute("id", "check");
    checkButton.setAttribute("class", "check");
    checkButton.setAttribute("onclick", "checkListItem(this)");

    deleteButtons = document.createElement("a");
    deleteButtons.setAttribute("id", "delete");
    deleteButtons.setAttribute("class", "button delete");
    deleteButtons.setAttribute("onclick", "removeListItem(this)");

    favoriteButtons = document.createElement("a");
    favoriteButtons.setAttribute("id", "favorite");
    favoriteButtons.setAttribute("onclick", "addFavorite()");
    favoriteButtons.setAttribute("class", "button favoriteButton");
    favoriteButtons.setAttribute("onclick", "favoriteListItem(this)");

}

/**
 * 
 * this function appends the subelements to the item
 * 
 */
function appendItems() {

    item.appendChild(checkButton);
    item.appendChild(textWrapper);
    item.appendChild(edit);

    textWrapper.appendChild(node);
    item.appendChild(actionArea);
    actionArea.appendChild(handleButtons);
    actionArea.appendChild(deleteButtons);
    actionArea.appendChild(favoriteButtons);

    element.appendChild(item);

}