
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


