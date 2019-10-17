// DARK MODE

const body = document.getElementsByTagName(body);

function switchToDark() {

    body.classList.add('dark');

}

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', switchToDark, false);

console.log('dark');