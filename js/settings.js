// DARK MODE

let darkModeOn = false;

function switchToDark() {

    const bodys = document.getElementsByTagName('body');
    
    for (var i = 0; i < bodys.length; i++) {

        bodys[i].classList.toggle('dark');
        test.setVisible(darkModeOn);
        darkModeOn = !darkModeOn;

    }

}

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', switchToDark, false);


// Write Dark Settings to local storage

let isVisible = true;
$("#myBtn").on('click', function(){
    panorama.setVisible(isVisible);
    isVisible = !isVisible;
});