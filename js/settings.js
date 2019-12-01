

const isDarkModeActivatedOnStart = localStorage.getItem('mode');

if (isDarkModeActivatedOnStart === 'true') {

    const bodys = document.getElementsByTagName('body');
    
    for (let i = 0; i < bodys.length; i++) {

        bodys[i].classList.add('dark');

    }

} else {

    const bodys = document.getElementsByTagName('body');
    
    for (let i = 0; i < bodys.length; i++) {

        bodys[i].classList.remove('dark');

    }

}



// DARK MODE

// let darkModeOn = false;

let darkModeOn;

if (isDarkModeActivatedOnStart === 'true') {

    darkModeOn = 1;

} else {

    darkModeOn = 2;

}

function switchToDark() {

    const bodys = document.getElementsByTagName('body');
    
    for (let i = 0; i < bodys.length; i++) {

        bodys[i].classList.toggle('dark');
        
        darkModeOn += 1;
        
        if (darkModeOn%2 == 0) {
    
            console.log ('test');
    
            let darkModeActivated = false;
            localStorage.setItem('mode', darkModeActivated);
    
        } else {

            let darkModeActivated = true;
            localStorage.setItem('mode', darkModeActivated); 

        }

} 

}


const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', switchToDark, false);





// Write Dark Settings to local storage

// Color mode settings

let colorTheme;
let colorThemeStorage = localStorage.getItem('colorTheme');

function loadTheme() {

    if (colorThemeStorage == "blue") {
        console.log("yeah");
        body.classList.add('blueTheme');
    } else if (colorThemeStorage == "green") {
        console.log('greeny');
        body.classList.add('greenTheme');
    } else if (colorThemeStorage == "pink") {
        console.log('pinki pink');
        body.classList.add('pinkTheme');
    }


}

loadTheme();

function blueTheme() {

    document.getElementById('body');
    body.classList.add('blueTheme');
    colorTheme = "blue";
    localStorage.setItem('colorTheme', colorTheme);

    if (body.classList.contains('greenTheme')) {
        body.classList.remove('greenTheme');
    } else if (body.classList.contains('pinkTheme')) {
        body.classList.remove('pinkTheme');
    }

    console.log('blue');

}



function greenTheme() {

    document.getElementById('body');
    body.classList.add('greenTheme');
    colorTheme = "green";
    localStorage.setItem('colorTheme', colorTheme);

    if (body.classList.contains('blueTheme')) {
        body.classList.remove('blueTheme');
    } else if (body.classList.contains('pinkTheme')) {
        body.classList.remove('pinkTheme');
    }

    console.log('blue');

}

function pinkTheme() {

    document.getElementById('body');
    body.classList.add('pinkTheme');
    colorTheme = "pink";
    localStorage.setItem('colorTheme', colorTheme);

    if (body.classList.contains('blueTheme')) {
        body.classList.remove('blueTheme');
    } else if (body.classList.contains('greenTheme')) {
        body.classList.remove('greenTheme');
    }


    console.log('blue');

}

function changeTheme(event) {
    console.log(event.target);
    if(event.target.classList.contains("blue")) {
      blueTheme();
    }
    console.log(event.target);
    if(event.target.classList.contains("green")) {
      greenTheme();
    }
    console.log(event.target);
    if(event.target.classList.contains("pink")) {
      pinkTheme();
    }
}

const blueToggle = document.getElementById('blueMode');
const greenToggle = document.getElementById('greenMode');
const pinkToggle = document.getElementById('pinkMode');

blueToggle.addEventListener('click', changeTheme, false);
greenToggle.addEventListener('click', changeTheme, false);
pinkToggle.addEventListener('click', changeTheme, false);