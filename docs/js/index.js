/* Github User request  */
function getUserInfo(user) {
    return fetch(`https://api.github.com/users/${user}`, {
            method: 'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data
        })
        .catch(err => console.log(err));
}

/* Check name, location available */
checkNameLocation = info => {
    console.log(info);
    if (info.name === null && info.location == null) {
        return ''
    } else if (info.name === null) {
        `location: ${info.location}`
    } else if (info.location === null) {
        `name: ${info.name}`
    } else if (info.name === undefined || info.location === undefined) {
        return 'User doesn\'t exist'
    } else {
        return `name: ${info.name} location: ${info.location}`
    }
}

/* Card component */
function showUserCard() {
    console.log(searchValue)
    getUserInfo(searchValue)
        .then((data) => {
            let divElement = document.createElement('div')
            divElement.className = 'user_card'
            let userImage = document.createElement('img')
            userImage.className = 'user_card__image'
            let pElement = document.createElement('p');
            pElement.className = "user_card__description"

            userImage.src = (data.avatar_url === undefined) ? '' : data.avatar_url;
            pElement.textContent = checkNameLocation(data)
            pElement.style="font-size: 1.2em"
            divElement.appendChild(userImage)
            divElement.appendChild(pElement)
            let mainSection =document.getElementById('main_section')
            mainSection.insertBefore(divElement, mainSection.firstChild)
        });
}

const userInput = document.getElementById('input')
userInput.oninput = (value) => {
    updateValue(value)
}

let searchValue;

function updateValue(e) {
    searchValue = e.target.value
}

const goButton = document.querySelector('.go')
const clearButton = document.querySelector('.clear')
goButton.onclick = () => {
    showUserCard()
    clearButton.style.display = "inline";
}

clearButton.onclick =() => {
    clearCard()
}

function clearCard() {
    let allCards = document.getElementById("main_section")
    while (allCards.firstChild) {
        allCards.removeChild(allCards.firstChild);
      }
    clearButton.style.display = "none";
}