document.addEventListener('DOMContentLoaded', function() {
    mapa();
    scrollNav();
    navegacionFija();
    contador();
    
    
    

});



function mapa(){

    var map = L.map('mapa').setView([20.653266411977146, -103.39135671578771], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([20.653266411977146, -103.39135671578771]).addTo(map)
        .bindPopup('Juega Retro. Boletos ya disponibles')
        .openPopup()
        .bindTooltip()
        .openTooltip()

}

function scrollNav(){

    const enlaces = document.querySelectorAll('.navegacion-principal');


    enlaces.forEach(function (enlace){
        enlace.addEventListener('click',function(e){
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        });
    })
}


function navegacionFija(){

    const barra =  document.querySelector('.header');

    //registrar el interseccion Observer
    const observer = new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo');
        }else{
            barra.classList.add('fijo');
        }
    });


    //elemento a observar

    observer.observe(document.querySelector('.video'));
}

function contador(){

    var countDownDate = new Date("Dec 11, 2021 11:00:00").getTime();


    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
      
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
      
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        // Display the result in the element with id="demo"
        document.getElementById("contador").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
      
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("contador").innerHTML = "EXPIRED";
        }
      }, 1000);
}