console.log("Added JS file");


const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

//messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();  //dont reload the page

    const location = search.value;

    
        messageOne.textContent='Loading...'
        messageTwo.textContent='';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error);
                messageOne.textContent=data.error;
            }
            else {
                messageOne.textContent=data.location;
                messageTwo.textContent=data.forecast;
                // console.log('Location: ' + data.location);
                // console.log('Forecast: ' + data.forecast);
            }
        })
    })

})