
// Username

// const userName = JSON.parse(user);

// let userName;

function updateUserCount() {

    const userNameHTML = document.getElementById('nameField');
    //let userName = "Luca Reichmann";
    let userName = document.getElementById("userName").value;
    const userNode = document.createTextNode(userName);
    userNameHTML.appendChild(userNode);
    
}



// E-Mail

/*

const userMail = JSON.parse(user);
const userMailHTML = document.getElementById('mailField');

const mailNode = document.createTextNode(userMail[0].mail);
userMailHTML.appendChild(mailNode);

*/

// profile picture

/**
const userPicture = JSON.parse(user);
const userPictureHTML = document.getElementById('profilePicture');

const pictureNode = document.createTextNode(userPicture[0].picture);
userPictureHTML.setAttribute("src", pictureNode.textContent);
*/