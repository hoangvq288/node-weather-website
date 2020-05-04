console.log("Loaded app.js")





const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')


  weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  msgOne.textContent = 'Searching .....'
  msgTwo.textContent = ''
  const address = searchElement.value
  fetch(`/weather?address=${address}`).then(response => {
    response.json().then(data => {
      if(data.error) {
        msgOne.textContent = data.error
      } else {
        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast
      }
    })
  })

})
