var menuOpen = false;
let hamMenu = () => {
    let x = document.getElementById("nav-link-ul");

    if (x.style.clipPath === "circle(900px at 95% -20%)") x.style.clipPath = "circle(100px at 95% -20%)";

    else x.style.clipPath = "circle(900px at 95% -20%)";


    let l1 = document.getElementById("line1");
    let l2 = document.getElementById("line2");
    let l3 = document.getElementById("line3");

    if (!menuOpen) {
        menuOpen = true;
        l1.style.transform = "rotate(-45deg) translate(-12px)";
        l2.style.transform = "translate(-50px)";
        l2.style.opacity = "0";
        l3.style.transform = "rotate(45deg) translate(-12px)";
    } else {
        menuOpen = false;
        l1.style.transform = "rotate(0deg) translate(0px)";
        l3.style.transform = "rotate(0deg) translate(0px)";
        l2.style.transform = "translate(0px)";
        l2.style.opacity = "1";
    }


}


let hideMenu = () => {
    if (screen.width <= 600) {
        let x = document.getElementById("nav-link-ul");
        x.style.clipPath = "circle(100px at 95% -20%)";
    }

    let l1 = document.getElementById("line1");
    let l2 = document.getElementById("line2");
    let l3 = document.getElementById("line3");

    menuOpen = false;
    l1.style.transform = "rotate(0deg) translate(0px)";
    l3.style.transform = "rotate(0deg) translate(0px)";
    l2.style.transform = "translate(0px)";
    l2.style.opacity = "1";
}