export const GetById = (e) => document.getElementById(e)

const THIS = HTMLElement.prototype
THIS.show = function(e){
  let elem = this.closest('.hide')
  let show = () => {
    elem.classList.add('show')
    elem.classList.remove('hide')
  }
  if(this.closest('.hide')) show()
  else if(this.classList.contains('hide')) show()
}
THIS.hide = function(e){
  let elem = this.closest('.show')
  let hide = () => {
    elem.classList.add('hide')
    elem.classList.remove('show')
  }
  if(this.closest('.show')) hide()
  else if(this.classList.contains('show')) hide()
}

//INPUT NUMBER ATTRIBUTE
const onlyNumbers = value => {return value.replace(/\D/g, "");};
document.querySelectorAll('input[number]').forEach(input => {
  input.addEventListener('input', function(event) { 
    if(event.keyCode != 46 && event.keyCode != 8){
      input.value = onlyNumbers(input.value); 
    }
  });  
})

//INPUT/LABEL COLOR PICKER
document.querySelectorAll('input[type="color"]').forEach( e => {
  let pickerColorId = e.getAttribute('pickercolor')

  if(pickerColorId) {
    let label = document.querySelector(`label[for="${e.id}"]`)
    let pickerColorInput = document.getElementById(pickerColorId)

    e.addEventListener('input', e => {
      label.style.background = e.target.value
      pickerColorInput.value = e.target.value
    })
  }
})