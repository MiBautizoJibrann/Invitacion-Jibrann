/*==================================================
BAUTIZO JIBRANN
SCRIPT.JS
VERSIÓN 2.0
PARTE 1
==================================================*/

"use strict";

/*==================================================
ELEMENTOS
==================================================*/

const loader = document.getElementById("loader");

const intro = document.getElementById("intro");

const invitacion = document.getElementById("invitacion");

const musica = document.getElementById("musica");

const sello = document.getElementById("sello");

const sobreCerrado = document.querySelector(".sobre-cerrado");

const sobreAbierto = document.querySelector(".sobre-abierto");

const bolsillo = document.querySelector(".sobre-bolsillo");

const carta = document.querySelector(".carta");

const botonMusica = document.getElementById("botonMusica");

const volverArriba = document.getElementById("volverArriba");

const dias = document.getElementById("dias");

const horas = document.getElementById("horas");

const minutos = document.getElementById("minutos");

const segundos = document.getElementById("segundos");

const reveal = document.querySelectorAll(".reveal");

/*==================================================
LOADER
==================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

    },1200);

});

/*==================================================
ABRIR SOBRE
==================================================*/

let abierto=false;

sello.addEventListener("click",abrirInvitacion);

function abrirInvitacion(){

    if(abierto) return;

    abierto=true;

    document.body.classList.add("abierto");

    musica.volume=.45;

    musica.play().catch(()=>{});

    botonMusica.classList.add("playing");

    /* Sello */

    sello.style.pointerEvents="none";

    /* Sobre */

    setTimeout(()=>{

        sobreCerrado.style.opacity="0";

        sobreAbierto.style.opacity="1";

        bolsillo.style.opacity="1";

    },450);

    /* Carta */

    setTimeout(()=>{

        carta.style.opacity="1";

        carta.style.bottom="20%";

    },850);

    /* Zoom */

    setTimeout(()=>{

        intro.style.transition="1.2s";

        intro.style.transform="scale(1.12)";

        intro.style.opacity="0";

    },2500);

    /* Mostrar invitación */

    setTimeout(()=>{

        intro.style.display="none";

        invitacion.style.display="block";

        window.scrollTo({

            top:0,

            behavior:"instant"

        });

    },3400);

}

/*==================================================
CUENTA REGRESIVA
==================================================*/

const fechaEvento = new Date("2026-07-25T16:00:00").getTime();

function actualizarContador(){

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;

    if(diferencia <= 0){

        dias.textContent="000";
        horas.textContent="00";
        minutos.textContent="00";
        segundos.textContent="00";

        return;

    }

    const d=Math.floor(diferencia/(1000*60*60*24));

    const h=Math.floor((diferencia%(1000*60*60*24))/(1000*60*60));

    const m=Math.floor((diferencia%(1000*60*60))/(1000*60));

    const s=Math.floor((diferencia%(1000*60))/1000);

    dias.textContent=String(d).padStart(3,"0");

    horas.textContent=String(h).padStart(2,"0");

    minutos.textContent=String(m).padStart(2,"0");

    segundos.textContent=String(s).padStart(2,"0");

}

actualizarContador();

setInterval(actualizarContador,1000);

/*==================================================
ANIMACIÓN SCROLL
==================================================*/

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{

    threshold:.18

});

reveal.forEach(item=>observer.observe(item));

/*==================================================
BOTÓN VOLVER ARRIBA
==================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        volverArriba.classList.add("show");

    }else{

        volverArriba.classList.remove("show");

    }

});

volverArriba.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==================================================
BOTÓN MÚSICA
==================================================*/

botonMusica.addEventListener("click",()=>{

    if(musica.paused){

        musica.play();

        botonMusica.classList.add("playing");

    }else{

        musica.pause();

        botonMusica.classList.remove("playing");

    }

});

/*==================================================
PARALLAX HERO
==================================================*/

const heroBrillo=document.querySelector(".hero-brillo");

const paloma=document.querySelector(".paloma");

window.addEventListener("scroll",()=>{

    const y=window.scrollY;

    if(heroBrillo){

        heroBrillo.style.transform=

        `translateY(${y*.08}px) scale(${1+y*.00012})`;

    }

    if(paloma){

        paloma.style.transform=

        `translateY(${y*.10}px)`;

    }

});

/*==================================================
EFECTO 3D TARJETAS
==================================================*/

const tarjetas=document.querySelectorAll(

".persona,.evento,.tiempo"

);

tarjetas.forEach(card=>{

    card.addEventListener("mousemove",e=>{

        const r=card.getBoundingClientRect();

        const x=e.clientX-r.left;

        const y=e.clientY-r.top;

        const rx=((r.height/2)-y)/16;

        const ry=(x-r.width/2)/16;

        card.style.transform=

        `perspective(900px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/*==================================================
SI EL NAVEGADOR BLOQUEA EL AUDIO
==================================================*/

document.addEventListener("click",()=>{

    if(abierto && musica.paused){

        musica.play().catch(()=>{});

    }

},{once:true});

/*==================================================
VARIABLE CSS VH
==================================================*/

function actualizarVH(){

    document.documentElement.style.setProperty(

        "--vh",

        `${window.innerHeight*.01}px`

    );

}

window.addEventListener(

    "resize",

    actualizarVH

);

actualizarVH();

/*==================================================
FIN
==================================================*/

console.log(

"%cInvitación Premium | Jibrann Aco Martínez",

"color:#d4af37;font-size:16px;font-weight:bold;"

);

