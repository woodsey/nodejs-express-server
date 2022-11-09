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

if (false) {
    fetch('http://localhost:3000/weather?address=Southampton').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
}


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    console.log('value: ' + location)
});