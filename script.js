/* ==========================================
   PARA ANALITH 💚
   
========================================== */

const intro = document.getElementById("intro");
const slideshow = document.getElementById("slideshow");
const finalScreen = document.getElementById("final");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const music = document.getElementById("music");

const slides = document.querySelectorAll(".slide");

let current = 0;
let timer = null;

/*==============================
    INICIAR PRESENTACIÓN
==============================*/

startBtn.addEventListener("click", () => {

    intro.classList.remove("active");
    intro.classList.add("hidden");

    slideshow.classList.remove("hidden");
    slideshow.classList.add("active");

    if (music) {

        music.volume = 0.5;

        music.play().catch(() => {
            console.log("El navegador bloqueó el autoplay.");
        });

    }

    createParticles();

    createHearts();

    showSlide(0);

});

/*==============================
    MOSTRAR SLIDE
==============================*/

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

    typeWriter(
        slides[index].querySelector("p")
    );

    clearTimeout(timer);

    timer = setTimeout(nextSlide,7000);

}

/*==============================
    SIGUIENTE
==============================*/

function nextSlide(){

    current++;

    if(current >= slides.length){

        finishPresentation();

        return;

    }

    showSlide(current);

}

/*==============================
    ANTERIOR
==============================*/

function previousSlide(){

    current--;

    if(current < 0){

        current = 0;

    }

    showSlide(current);

}

/*==============================
   EFECTO ESCRITURA
==============================*/

function typeWriter(element){

    const text = element.dataset.text || element.innerText;

    element.dataset.text = text;

    element.innerText = "";

    let i = 0;

    const speed = 35;

    function write(){

        if(i < text.length){

            element.innerText += text.charAt(i);

            i++;

            setTimeout(write,speed);

        }

    }

    write();

}
/*==============================
   FINALIZAR PRESENTACIÓN
==============================*/

function finishPresentation(){

    clearTimeout(timer);

    slideshow.classList.remove("active");
    slideshow.classList.add("hidden");

    finalScreen.classList.remove("hidden");
    finalScreen.classList.add("active");

}

/*==============================
   REINICIAR
==============================*/

restartBtn.addEventListener("click",()=>{

    current = 0;

    finalScreen.classList.remove("active");
    finalScreen.classList.add("hidden");

    intro.classList.remove("hidden");
    intro.classList.add("active");

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    clearTimeout(timer);

    if(music){

        music.pause();

        music.currentTime = 0;

    }

});

/*==============================
      CORAZONES
==============================*/

function createHearts(){

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="💚";

        heart.style.left=Math.random()*100+"vw";

        heart.style.fontSize=(18+Math.random()*20)+"px";

        heart.style.animationDuration=(5+Math.random()*4)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },9000);

    },450);

}

/*==============================
      PARTÍCULAS
==============================*/

function createParticles(){

    const container=document.getElementById("particles");

    for(let i=0;i<80;i++){

        const p=document.createElement("span");

        p.className="particle";

        p.style.left=Math.random()*100+"vw";

        p.style.top=Math.random()*100+"vh";

        p.style.animationDuration=(6+Math.random()*12)+"s";

        p.style.animationDelay=(Math.random()*8)+"s";

        container.appendChild(p);

    }

}

/*==============================
      TECLADO
==============================*/

document.addEventListener("keydown",(e)=>{

    if(slideshow.classList.contains("hidden"))
        return;

    if(e.key==="ArrowRight"){

        clearTimeout(timer);

        nextSlide();

    }

    if(e.key==="ArrowLeft"){

        clearTimeout(timer);

        previousSlide();

    }

    if(e.code==="Space"){

        e.preventDefault();

        clearTimeout(timer);

        nextSlide();

    }

});
/*==============================
      PRECARGAR IMÁGENES
==============================*/

function preloadImages(){

    slides.forEach(slide=>{

        const img = slide.querySelector("img");

        if(img){

            const preload = new Image();

            preload.src = img.src;

        }

    });

}

preloadImages();

/*==============================
      EFECTO DE ENTRADA
==============================*/

slides.forEach(slide=>{

    slide.style.transition =
    "opacity 1.2s ease, transform 1.2s ease";

});

/*==============================
      BRILLO SUAVE
==============================*/

setInterval(()=>{

    const activeSlide =
    document.querySelector(".slide.active img");

    if(!activeSlide) return;

    activeSlide.animate(

        [

            {
                boxShadow:"0 0 20px #00ff88"
            },

            {
                boxShadow:"0 0 50px #00ff88"
            },

            {
                boxShadow:"0 0 20px #00ff88"
            }

        ],

        {

            duration:2200

        }

    );

},2200);

/*==============================
      MENSAJE EN CONSOLA
==============================*/

console.log("%cPara Analith 💚",
"color:#00ff88;font-size:26px;font-weight:bold;");

console.log(
"Creado con muchísimo cariño por Juan Lenis."
);