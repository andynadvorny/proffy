const addFieldButton = document.querySelector('#add-time')

addFieldButton.addEventListener('click', addField)

function addField() {
  const dateSection = document.querySelector('.schedule-item').cloneNode(true)
  
  const dateFields = dateSection.querySelectorAll('input')
  dateFields.forEach(field => {
    dateFields.value = ""
  });

  document.querySelector('#schedule-items').appendChild(dateSection)
}