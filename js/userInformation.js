
// Username

const userName = JSON.parse(user);
const userNameHTML = document.getElementById('nameField');

const userNode = document.createTextNode(userName[0].name);
userNameHTML.appendChild(userNode);

// E-Mail

/*

const userMail = JSON.parse(user);
const userMailHTML = document.getElementById('mailField');

const mailNode = document.createTextNode(userMail[0].mail);
userMailHTML.appendChild(mailNode);

*/

// profile picture

const userPicture = JSON.parse(user);
const userPictureHTML = document.getElementById('profilePicture');

const pictureNode = document.createTextNode(userPicture[0].picture);
userPictureHTML.setAttribute("src", pictureNode.textContent);
