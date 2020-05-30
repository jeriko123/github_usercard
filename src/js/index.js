const element = document.getElementById('input')
const button = document.querySelector('button')

let divElement = document.createElement('div')
divElement.className = 'user_card'
let userImage = document.createElement('img')
userImage.className = 'user_card__image'
let pElement = document.createElement('p');
pElement.className = "user_card__description"
let searchValue;


//Url request
function getUserInfo(user) {
    return fetch(`https://api.github.com/users/${user}`, {
            method: 'GET',
            Authorization: "token e8fe74c4ecefd9e5dda2f2bfdb668d4c78229b34"
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data
        });
}

element.oninput = (value) => {
    updateValue(value)
}

function updateValue(e) {
    searchValue = e.target.value

}

button.onclick = () => {
    showValue()
}

function showValue() {
    console.log(searchValue)
    getUserInfo(searchValue)
        .then((data) => {
            console.log(data);
            userImage.src = data.avatar_url
            pElement.textContent = `name: ${data.name} location: ${data.location}`
            divElement.appendChild(userImage)
            divElement.appendChild(pElement)
            document.getElementById('main_section').appendChild(divElement)
        });
}