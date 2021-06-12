

document.addEventListener( 'DOMContentLoaded', function () {

    let slideServices = new Splide( '.splide', {
        type   : 'slide',
        perPage: 4,
        lazyLoad: 'nearby',
        gap: '2em',
        padding: '2em',
        pagination: false,
        breakpoints: {
            960: {
                perPage: 3,
            },
            640: {
                perPage: 1,
            },
        }
    } ).mount();

    slideServices.on( 'move', function(current) {
      let currentSlide = '0' + (current + 1)
      document.querySelector('.current__indicator').innerText = currentSlide
    } );
} );


// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }



// smoth scroll

const links = document.querySelectorAll(".anchor__link");
 
for (const link of links) {
  link.addEventListener("click", clickHandler);
}
 
function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  console.log(offsetTop)
  window.scrollTo({
    top: offsetTop,
    left: 0,
    behavior: "smooth"
  });

}