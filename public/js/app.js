console.log('Client side javascript file loaded');


//{ mode: "no-cors" }
// this code is not working, something wrong with the response but cannot figure out why
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    console.log(response)
    response.json().then((data) => {
        console.log(data)
    })
});
*/

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const doLive = true;

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    console.log('value: ' + location)

    messageOne.textContent = "";
    messageTwo.textContent = "";

    if (doLive) {
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = "There was an error: " + data.error
                } else {
                    messageOne.textContent = "Location: " + data.location;
                    messageTwo.textContent = "Forecast: " + data.forecast;
                }
            })
        })
    }

});