
function showslides (current) {
  
  let currentSlide = ''
  if(window.innerWidth >= 960){
    if(current < 4){
      currentSlide = '01 / 02'
    } else {
      currentSlide = '02 / 02'
    }
  }
  if(window.innerWidth > 640 && window.innerWidth < 960){
    console.log(current)
    if(current < 2){
      currentSlide = '01 / 04'
    } else if(current >= 1 && current < 4){
      currentSlide = '02 / 04'
    }else if(current >= 4 && current < 5){
      currentSlide = '03 / 04'
    } else {
      currentSlide = '04 / 04'
    }
  } else if(window.innerWidth <= 640) {
    currentSlide = '0' + (current + 1) + '/ 08'
  }

  document.querySelector('.current__indicator').innerText = currentSlide
}
function initMailJS () {
  emailjs.init("user_UQTlOPCNaIiD612Vp0POz");
}
document.addEventListener('DOMContentLoaded', function () {
  let slide = document.querySelector('.splide')
  if(slide) {

    let slideServices = new Splide('.splide', {
      type: 'slide',
      perPage: 4,
      lazyLoad: 'nearby',
      gap: '2em',
      padding: '2em',
      pagination: false,
      breakpoints: {
        960: {
          perPage: 2,
        },
        640: {
          perPage: 1,
        },
      }
    }).mount()
    slideServices.on('move', function (current) {
      showslides(current)
    })
    showslides(1)
    initMailJS()
  }
});

window.addEventListener('resize', function(){
  let activeSlide = document.querySelector('.splide__slide.is-active')
  if(activeSlide){
    let idActiveSlide = activeSlide.getAttribute('id').split('-')[1].substring(6)
    showslides(parseInt(idActiveSlide))
  }
}, false)


var scroll = window.requestAnimationFrame ||
function (callback) {
  window.setTimeout(callback, 1000 / 60)
}
var elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {

  Array.prototype.forEach.call(elementsToShow, function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible')
    } 
  });

  scroll(loop)
}
loop()

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0]
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 &&
      rect.bottom >= 0) ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

const links = document.querySelectorAll(".anchor__link");
for (const link of links) {
  link.addEventListener("click", clickHandler);
}
function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  console.log(offsetTop)
  window.scrollTo({top:offsetTop,left:0,behavior:"smooth"});
}


// send form
const requestContact = (objContact) => {

  const request = new XMLHttpRequest()
  request.open('POST','https://api.emailjs.com/api/v1.0/email/send-form')
  request.addEventListener('readystatechange', () => {
      if(request.readyState !== 4) {
          return 
      } else {
          if(request.status >= 200 && request.status <= 299){
              if(request.response === 'OK') {
                document.querySelector('.modal__contact__send').classList.add('open')
                // clear form
                nombre.value = ''
                apellido.value = ''
                mail.value = ''
                telefono.value = ''
                servicio.value = ''
                mensaje.value = ''
                checkbox__input.checked = false
              }
          } else {
              console.log('No se pudo ejecutar')
          }
      } 
  })
  request.send(objContact)
}
let formContact = document.getElementById('form__contactform')
let nombre = document.getElementById('nombre')
let apellido = document.getElementById('apellido')
let mail = document.getElementById('mail')
let telefono = document.getElementById('telefono')
let servicio = document.getElementById('servicio')
let mensaje = document.getElementById('mensaje')
let checkbox__input = document.getElementById('checkbox__input')
formContact && formContact.addEventListener('submit', function(event){

  event.preventDefault()
  
  let valid = true
  if( nombre.value === "" ){
    nombre.classList.add('is-invalid')
    valid = false
  }
  if( apellido.value === "" ){
    apellido.classList.add('is-invalid')
    valid = false
  }
  if( mail.value === "" ){
    mail.classList.add('is-invalid')
    valid = false
  }
  if( telefono.value === "" ){
    telefono.classList.add('is-invalid')
    valid = false
  }
  if( servicio.value === "" ){
    servicio.classList.add('is-invalid')
    valid = false
  }
  if( mensaje.value === "" ){
    mensaje.classList.add('is-invalid')
    valid = false
  }
  if( checkbox__input.checked === false ){
    checkbox__input.classList.add('is-invalid')
    valid = false
  }
  if(valid) {
    let recaptcha = document.getElementById('g-recaptcha-response')
    let formData = new FormData();
    formData.append('service_id', 'service_zsam2t7');
    formData.append('template_id', 'template_wt9rier');
    formData.append('user_id', 'user_UQTlOPCNaIiD612Vp0POz');
    formData.append('from_name', nombre.value + ' ' + apellido.value);
    formData.append('email__user', mail.value);
    formData.append('phone__user', telefono.value);
    formData.append('service__user', servicio.value);
    formData.append('message', mensaje.value);
    formData.append('g-recaptcha-response', recaptcha.value);
    
    requestContact(formData)

  }

})

// close modal sending
let close__contact__send = document.querySelector('.close__contact__send')
if(close__contact__send){
  close__contact__send.addEventListener('click',function(){
    document.querySelector('.modal__contact__send').classList.remove('open')
  })
}


function validateEmail(inputText) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputText)
}

emailInput = document.querySelector('.is-email')
if(emailInput){
  emailInput.addEventListener('keyup', function(){
    var email = emailInput.value
    console.log(validateEmail(email))
    if(email.length > 0){
      if(validateEmail(email)) {
        emailInput.classList.remove('is-invalid')
      } else {
        emailInput.classList.add('is-invalid')
      }
    } else {
      emailInput.classList.remove('is-invalid')
    }
  })
  emailInput.addEventListener('keyup', function(){
    var email = emailInput.value
    console.log(validateEmail(email))
    if(email.length > 0){
      if(validateEmail(email)) {
        emailInput.classList.remove('is-invalid')
        emailInput.classList.add('is-valid')
      } else {
        emailInput.classList.remove('is-valid')
        emailInput.classList.add('is-invalid')
      }
    } else {
      emailInput.classList.remove('is-valid')
    }
  })
}

function validatePhone(inputText) {
  var phoneRe = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
  var digits = inputText.replace(/\D/g, "")
  return phoneRe.test(digits)
}

phoneInput = document.querySelector('.is-phone')
if(phoneInput){
  phoneInput.addEventListener('keyup', function(){
    var phone = phoneInput.value
    if(phone.length > 0){
      if(validatePhone(phone)) {
        phoneInput.classList.remove('is-invalid')
        phoneInput.classList.add('is-valid')
      } else {
        phoneInput.classList.add('is-invalid')
        phoneInput.classList.remove('is-valid')
      }
    } else {
      phoneInput.classList.remove('is-invalid')
    }
  })

}

function inputChange(event) {
  if(event.target.value.length > 0){
    event.target.classList.remove('is-invalid')
    event.target.classList.add('is-valid')
  } else {
    event.target.classList.remove('is-valid')
    event.target.classList.add('is-invalid')
  }
}

var description = document.querySelector('.form__text__description')
description  && description.addEventListener('change', inputChange )
description  && description.addEventListener('keyup', inputChange )


var inputName = document.querySelector('#nombre')
inputName  && inputName.addEventListener('change', inputChange )
inputName  && inputName.addEventListener('keyup', inputChange )

var inputLastName = document.querySelector('#apellido')
inputLastName  && inputLastName.addEventListener('change', inputChange )
inputLastName  && inputLastName.addEventListener('keyup', inputChange )


var service = document.querySelector('#servicio')
service  && service.addEventListener('change', function(){
  console.log(service.value)
  if(service.value.length > 0){
    service.classList.remove('is-invalid')
    service.classList.add('is-valid')
  } else {
    service.classList.remove('is-valid')
    service.classList.add('is-invalid')
  }
} )

var termsAndConditions = document.querySelector('#checkbox__input')
termsAndConditions  && termsAndConditions.addEventListener('change', function(){

  if(termsAndConditions.checked  === true){
    termsAndConditions.classList.remove('is-invalid')
    termsAndConditions.classList.add('is-valid')
  } else {
    termsAndConditions.classList.remove('is-valid')
    termsAndConditions.classList.add('is-invalid')
  }

} )

