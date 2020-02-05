if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .catch(function (err) {
            console.error(err);
        });
}

let item;
let textWrapper;
let edit;
let node;
let actionArea;
let handleButtons;
let checkButton;
let deleteButtons;
let favoriteButtons;
let counter = 1;
let saveCounter;
const dynamicSection = document.getElementById('dynamicSection');

saveCounter = localStorage.getItem('counter');
if (saveCounter === null) {
    localStorage.setItem('counter', counter);
}

let element = document.getElementById("todoItems");
const form = document.getElementById("form");
const submitButton = document.getElementById('submit');
var input = document.getElementById("box");
const actionAreaSwitcher = document.getElementsByClassName("actionArea");

// increase counter function

function increaseCounteronenter() {

    if (event.keyCode === 13) {
        counter = JSON.parse(window.localStorage.getItem('counter'));
        counter += 1;
        localStorage.setItem('counter', counter);
        form.reset();
    }

}

function increaseCounteronclick() {

    counter = JSON.parse(window.localStorage.getItem('counter'));
    counter += 1;
    localStorage.setItem('counter', counter);
    form.reset();

}

// increase counter

document.addEventListener('keyup', increaseCounteronenter, false);
submitButton.addEventListener('click', increaseCounteronclick, false);

counter = window.localStorage.getItem(counter);

let items = [];

function setItems() {

    boxvalue = document.getElementById('box').value;
    counter = localStorage.getItem('counter');
    if (boxvalue.length > 1) {
        localStorage.setItem('task:' + counter + 'todoItems', items);
        items.push(boxvalue);
        localStorage.setItem('task:' + counter + 'todoItems', items);
        items = [];
        return false;

    }

}

function createList() {
    let tasks;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('task:')) {
            if (key.includes(counter - 1)) {
                let sub;
                if (counter < 10) {
                    sub = key.substr(0, 6);
                } else {
                    sub = key.substr(0, 7);
                }
                
                tasks = localStorage.getItem(sub + 'todoItems');
            }
        }
    }

    item = document.createElement("li");
    item.className = "listElement" + counter;
    item.classList.add("task:" + (counter - 1));
    node = document.createTextNode(tasks);
    textWrapper = document.createElement("a");
    textWrapper.setAttribute("class", "textWrapper");
    createItemIcons();
    appendItems();
    element.appendChild(item);

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



favoriteButtons = document.getElementsByClassName("favoriteButton");

for (var i = 0; i < favoriteButtons.length; i++) {

    favoriteButtons[i].addEventListener('click', function (event) {

    }, false);

}


// actionArea
for (var i = 0; i < actionAreaSwitcher.length; i++) {

    actionAreaSwitcher[i].addEventListener("click", function (event) {


        actionAreaSwitcher[i].classList.add("test");

    }, false);

}

// remove item functionality

function removeListItem(obj) {
    let removedItem;
    obj.parentNode.parentNode.remove();


    let objClass = obj.parentNode.parentNode.classList[1];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes(objClass)) {
            localStorage.removeItem(key);
        }
    }   
    //localStorage.removeItem(objClass);


}

function focuseItem(obj) {
    obj.parentNode.classList.toggle('opened');
}


// favorite item functionality 

/**
 * NOT FULLY IMPLEMENTED
 * 
 * @param 
 */


function addFavoriteListItem(obj) {
    obj.parentNode.parentNode.classList.toggle('favoriteItem');

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes(obj.parentNode.parentNode.classList[1])) { 
            if (key.includes('isFav') == false) {
                let test = localStorage.getItem(key);
    
                localStorage.setItem(key + 'isFav', test);
                localStorage.removeItem(key); 
            } 
        }
    }    
    let testItem = obj;
    testItem.setAttribute('onclick', "removeFavoriteListItem(this)");

}

// remove Fav

function removeFavoriteListItem(obj) {
    obj.parentNode.parentNode.classList.toggle('favoriteItem');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes(obj.parentNode.parentNode.classList[1])) { 
            if (key.includes('isFav')) {
                let test3 = localStorage.getItem(key);
             
                const splitFav = 'isFav';
                let anotherNewKey = key.replace(splitFav, '');
                localStorage.setItem(anotherNewKey, test3);
                localStorage.removeItem(key); 
            } 
        }
    }    

    let testItem = obj;
    testItem.setAttribute('onclick', "addFavoriteListItem(this)");

}



// check item functionality

var myVar;

function checkListItem(obj) {

    obj.parentNode.classList.add('removed');

    setTimeout(function () {
        obj.parentNode.remove();
        // localStorage.removeItem(obj.parentNode.classList[1]);

        let objClass = obj.parentNode.classList[1];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(objClass)) {
                localStorage.removeItem(key);
            }
        }   

    }, 2000);

}

// reset functionality

const resetButton = document.getElementById('reset');

function resetItems() {

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("task:")) {
     
            localStorage.removeItem(key);
        }
    }

    element.innerHTML = "";
    counter = 1;
    localStorage.setItem('counter', counter);

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

let allItems = document.getElementsByTagName('ul');

let itemEl;
let itemPosition; 
let oldItemPosition;   // target list
let draggedItemContainerId;
let draggedItemClass;
let itemContent;
let prevContainer;
for (let i = 0; i < allItems.length; i++) {
    var sortable = new Sortable(allItems[i], {
        animation: 150,
        group: 'shared',
        handle: '.handle', // handle's class
        onEnd: function (/**Event*/evt) {
            itemEl = evt.item;
            itemPosition = evt.to;  
            oldItemPosition = evt.from; 
            oldItemPositionId = oldItemPosition.id; 
            draggedItemContainerId = itemPosition.id;
            draggedItemClass = itemEl.classList[1];

            itemContent = localStorage.getItem(draggedItemClass);
            console.log(itemContent);


            if (itemContent === null) {
                
                    itemContent = localStorage.getItem(draggedItemClass + oldItemPositionId);
                    console.log('works null' + itemContent);
                
                	if (itemContent === null) {
                        console.log('works null null' + itemContent);
                        itemContent = localStorage.getItem(draggedItemClass + oldItemPositionId + 'isFav');
                        console.log('works null null null ' + itemContent);
                    }

            }

            if (oldItemPositionId !== draggedItemContainerId) {
                //console.log(draggedItemClass + oldItemPositionId);
                let testItemContent = localStorage.getItem(draggedItemClass + oldItemPositionId);
                    
                
                if (testItemContent === null) {
                    localStorage.setItem(draggedItemClass + draggedItemContainerId + 'isFav', itemContent);
                } else {
                    localStorage.setItem(draggedItemClass + draggedItemContainerId, itemContent);
                }
                
                localStorage.removeItem(draggedItemClass + oldItemPositionId);
                if (testItemContent === null) {
                    localStorage.removeItem(draggedItemClass + oldItemPositionId + 'isFav');
                }    
            }

            
            prevContainer = draggedItemContainerId;
        }
    });
}

var pending = document.getElementById('pendingTodoItems');
var sortable = new Sortable(pending, {
    animation: 150,
    group: 'shared',
    handle: '.handle', // handle's class
});

// save where item was put




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

/**
 * 
 * 
 * 
 */

function openerFunction() {    
    dynamicSection.classList.add('opened');

    
}


if (dynamicSection.classList.contains('opened')) {
    window.onclick = function(event) {
        if (event.target !== dynamicSection) {
            dynamicSection.style.display = "none";
        }
    }

}

/**
 * 
 * 
 */

const opener = document.getElementById('addSections');
opener.addEventListener("click", openerFunction, false);


/**
 * Create dynamic sections
 * 
 * 
 */

function createDynamicSection() {

    let boxvalue = document.getElementById('sectionName').value;
    dynamicSection.classList.remove('opened');
    if (boxvalue.length > 0) {
        let itemWrapper = document.createElement("div");
        let itemHeading = document.createElement("h2");
        let itemList = document.createElement("ul");
        let removeList = document.createElement("a");
        removeList.setAttribute('onclick', 'removeSections(this)');
        removeList.textContent = 'Remove';
        itemWrapper.classList.add('itemWrapper');
        itemWrapper.classList.add(boxvalue + 'Section');
        itemWrapper.classList.add('section' + boxvalue);
        itemHeading.textContent = boxvalue;
        itemList.setAttribute('id', boxvalue);

        const wrapper = document.getElementById('itemSections');

        itemWrapper.appendChild(itemHeading);
        itemWrapper.appendChild(itemList);
        itemWrapper.appendChild(removeList);

        wrapper.appendChild(itemWrapper);

        //const body = document.getElementsByTagName('body');
        
        localStorage.setItem('section' + boxvalue, boxvalue);

        for (let i = 0; i < allItems.length; i++) {
            var sortable = new Sortable(allItems[i], {
                animation: 150,
                group: 'shared',
                handle: '.handle', // handle's class
                onEnd: function (/**Event*/evt) {
                    itemEl = evt.item;
                    itemPosition = evt.to;  
                    oldItemPosition = evt.from; 
                    oldItemPositionId = oldItemPosition.id; 
                    draggedItemContainerId = itemPosition.id;
                    draggedItemClass = itemEl.classList[1];
        
                    itemContent = localStorage.getItem(draggedItemClass);
                    console.log(itemContent);
        
        
                    if (itemContent === null) {
                
                        itemContent = localStorage.getItem(draggedItemClass + oldItemPositionId);
                        console.log('works null' + itemContent);
                    
                        if (itemContent === null) {
                            console.log('works null null' + itemContent);
                            itemContent = localStorage.getItem(draggedItemClass + oldItemPositionId + 'isFav');
                            console.log('works null null null ' + itemContent);
                        }
    
                }
    
                if (oldItemPositionId !== draggedItemContainerId) {
                    //console.log(draggedItemClass + oldItemPositionId);
                    let testItemContent = localStorage.getItem(draggedItemClass + oldItemPositionId);
                        
                    
                    if (testItemContent === null) {
                        localStorage.setItem(draggedItemClass + draggedItemContainerId + 'isFav', itemContent);
                    } else {
                        localStorage.setItem(draggedItemClass + draggedItemContainerId, itemContent);
                    }
                    
                    localStorage.removeItem(draggedItemClass + oldItemPositionId);
                    if (testItemContent === null) {
                        localStorage.removeItem(draggedItemClass + oldItemPositionId + 'isFav');
                    }    
                }
                    
                    prevContainer = draggedItemContainerId;
                }
            });
        }
    }
}

function loadSections() {

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.includes('section')) {
            
            let boxvalue = localStorage.getItem(key);
            let itemWrapper = document.createElement("div");
            let itemHeading = document.createElement("h2");
            let itemList = document.createElement("ul");
            let removeList = document.createElement("a");

            removeList.textContent = 'Remove';
            removeList.setAttribute('onclick', 'removeSections(this)');
            itemWrapper.classList.add('itemWrapper');
            itemWrapper.classList.add(boxvalue + 'Section');
            itemWrapper.classList.add('section' + boxvalue);
            itemWrapper.classList.add(boxvalue);
            itemHeading.textContent = boxvalue;
            itemList.setAttribute('id', boxvalue);
        
            const wrapper = document.getElementById('itemSections');
        
            itemWrapper.appendChild(itemHeading);
            itemWrapper.appendChild(itemList);
            itemWrapper.appendChild(removeList);
            wrapper.appendChild(itemWrapper);
    
        }

    }    

    for (let i = 0; i < allItems.length; i++) {
        var sortable = new Sortable(allItems[i], {
            animation: 150,
            group: 'shared',
            handle: '.handle', // handle's class
            onEnd: function (/**Event*/evt) {
                itemEl = evt.item;
                itemPosition = evt.to;  
                oldItemPosition = evt.from; 
                oldItemPositionId = oldItemPosition.id; 
                draggedItemContainerId = itemPosition.id;
                draggedItemClass = itemEl.classList[1];
    
                itemContent = localStorage.getItem(draggedItemClass);
                console.log(itemContent);
    
    
                if (itemContent === null) {
                    
                        itemContent = localStorage.getItem(draggedItemClass + oldItemPositionId);
                        console.log('works null' + itemContent);
                        if (itemContent === null) {

                            itemContent = localStorage.getItem(draggedItemClass + oldItemPositionId + 'isFav');
    
                        }
                    
                }
    
                if (oldItemPositionId !== draggedItemContainerId) {
                    console.log(draggedItemClass + oldItemPositionId);
                    localStorage.setItem(draggedItemClass + draggedItemContainerId, itemContent);
                    localStorage.removeItem(draggedItemClass + oldItemPositionId);
                }
               
                prevContainer = draggedItemContainerId;
            }
        });
    }

}

window.load = loadSections();

function removeSections(obj) {

    obj.parentNode.remove();
    let objClass = obj.parentNode.classList[2];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes(objClass)) {
            localStorage.removeItem(key);
        }
    }   
    localStorage.removeItem(objClass);

}


function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}


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
    favoriteButtons.setAttribute("onclick", "addFavoriteListItem(this)");

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



}

function createInitialList() {

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let counters = localStorage.getItem('counter');
        let toReplace = 'task:';
        let toReplace2 = 'isFav';
        let anotherNewKey = key.replace(toReplace, '');
        
        anotherNewKey = setCharAt(anotherNewKey, 0, '');

        let newKey = key.replace('isFav', '');
        let counter = localStorage.getItem('counter');
        if (key.includes("task:")) {

            if (newKey.includes(anotherNewKey)) {
                newKey.replace(anotherNewKey, '');
            }
            if (anotherNewKey.includes('isFav')) {
                anotherNewKey.replace('isFav', '');
            }
            let anotherNewKey2 = anotherNewKey.replace(toReplace2, '');

            let onlySub;
            let onlySub2;
            onlySub = key.substr(0, 6);
     
            var value = localStorage.getItem(key);

            item = document.createElement("li");

            item.classList.add("listElement", onlySub);
            if (key.includes('isFav')) {
                item.classList.add("favoriteItem");
            }

            item.setAttribute("id", key);

            node = document.createTextNode(value);

            textWrapper = document.createElement("a");
            textWrapper.setAttribute("class", "textWrapper");

            createItemIcons();
            appendItems();

            if (key.includes("isFav")) {
                favoriteButtons.setAttribute("onclick", "removeFavoriteListItem(this)");
            }

            let whereToAppendItem = document.getElementById(anotherNewKey2);

    

            if (key.length > 6) {
                whereToAppendItem.appendChild(item);
            } else {
                element.appendChild(item);
            }

        }
    }
}


window.onload = createInitialList();
