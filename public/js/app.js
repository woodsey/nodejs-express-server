console.log('Client side javascript file loaded');


//{ mode: "no-cors" }
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    console.log(response)
    response.json().then((data) => {
        console.log(data)
    })
});


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