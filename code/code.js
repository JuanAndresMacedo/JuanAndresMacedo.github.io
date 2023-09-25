
window.addEventListener('load', inicio);


function inicio() {
    showOpenProgram("minimized-aboutMe-window", "aboutMe-window", "img/icons/book.png", "Sobre Mi");
    fillContentWindow("aboutMe-window");
}

//------- Windows --------
const programsWindow = document.getElementById("programs-window");
const projectWindow = document.getElementById("project-window");
const aboutMeWindow = document.getElementById("aboutMe-window");
const helpWindow = document.getElementById("help-window");
const projectInformationWindow = document.getElementById("project-information-window");
const mobileProjectInformationWindow = document.getElementById("mobile-project-information-window");

//------ Containers --------
const iconContainers = document.querySelectorAll(".icon-container");
const windows = document.querySelectorAll(".window");
const projectContainers = document.querySelectorAll(".project-content");
const projects = document.querySelectorAll(".project");
//const minimizedPrograms = document.querySelectorAll(".minimized-program");
//const openProgramContainer = document.getElementById("open-program-container");

//------- TopBar --------
const programsWindowTopBarIcon = document.getElementById("programs-window-topBar-icon");
const programsWindowTopBarName = document.getElementById("programs-window-topBar-name");

const projectContainerTopBarIcon = document.getElementById("project-topBar-icon");
const projectContainerTopBarName = document.getElementById("project-topBar-name");

const mobileProjectContainerTopBarIcon = document.getElementById("mobile-project-topBar-icon");
const mobileProjectContainerTopBarName = document.getElementById("mobile-project-topBar-name");

//------- Buttons --------
const minimizeButton = document.getElementById("minimize-button");

//Close Buttons
const closeButton = document.getElementById("close-button");
const helpCloseButton = document.getElementById("help-close-button");
const projectCloseButton = document.getElementById("project-close-button");
const mobileProjectCloseButton = document.getElementById("mobile-project-close-button");

//------- Icons --------
const backgroundChange = document.getElementById("landscape-container");

//Footer
const footer = document.getElementById("footer");

//------------------------------------ Functions ------------------------------------------------------------

//PRE: -
//POS: Close every content window
function closeContentWindows() {
    windows.forEach(window => {
        window.style.display = "none";
    });
}

//PRE: -
//POS: Show the selected content window
function showContentWindow(id) {
    programsWindow.style.display = "none";
    closeContentWindows();
    const windowToShow = document.getElementById(id);
    windowToShow.style.display = "flex";
    programsWindow.style.display = "block";
}

function showProjectWindow(id) {
    closeProjectWindows();
    const windowWidth = window.innerWidth;

    if (windowWidth <= 820) {
        const windowToShow = document.getElementById("mobile-" + id);
        windowToShow.style.display = "flex";
        mobileProjectInformationWindow.style.display = "block";
        closeContentWindows();
    } else {
        const windowToShow = document.getElementById(id);
        windowToShow.style.display = "flex";
        projectInformationWindow.style.display = "block";
    }
}

//PRE: -
//POS: Create and insert the corresponding minimized open program in the footer
function showOpenProgram(programId, windowId, src, text) {
    if (document.getElementById(programId) == null) {
        const newOpenProgram = document.createElement('div');
        newOpenProgram.classList.add('minimized-program');
        newOpenProgram.classList.add('open');
        newOpenProgram.id = programId;
        newOpenProgram.setAttribute("data-target", windowId);

        const newProgramIcon = document.createElement('img');
        newProgramIcon.src = src;
        newProgramIcon.alt = 'Minimized Icon';
        newProgramIcon.classList.add('minimized-window-icon');

        const newProgramText = document.createElement('span');
        newProgramText.classList.add('minimized-text');
        newProgramText.innerHTML = text;

        newOpenProgram.appendChild(newProgramIcon);
        newOpenProgram.appendChild(newProgramText);

        newOpenProgram.addEventListener('click', () => {
            programsWindow.style.display = "none";
            closeContentWindows();
            fillTopBar(programsWindowTopBarIcon, programsWindowTopBarName, src, text);
            programsWindow.setAttribute("data-target", programId);
            showContentWindow(newOpenProgram.getAttribute('data-target'));
        });

        footer.appendChild(newOpenProgram);
    } else {
        console.log("Ya esta abierto");
    }
}

//PRE: -
//POS: Close every content window
function closeProjectWindows() {
    projectContainers.forEach(projectContainer => {
        projectContainer.style.display = "none"
    });

    const windowWidth = window.innerWidth;

    if (windowWidth <= 820) {
        projectWindow.style.display = "flex";
        mobileProjectInformationWindow.style.display = "none";
    } else {
        projectInformationWindow.style.display = "none";
    }
}

//PRE: -
//POS: Close the minimized open program in the footer
function closeMinimizedOpenProgram(id) {
    const miniWindow = document.getElementById(id);
    miniWindow.remove();
}

//PRE: -
//POS: Fill the top bar of the interactive window with the selected content window information
function fillTopBar(topBarIcon, topBarName, src, text) {
    topBarIcon.src = src;
    topBarName.innerHTML = text;
}

//PRE: -
//POS: Fill each content window with the default information
function fillContentWindow(id) {
    if (id == "aboutMe-window") {
        index = 0;
        rightButton.style.color = "black";
        leftButton.style.color = "#9b9b9b";

        changeArrayTextDependingOnWindowWidth();
        aboutMeText.innerHTML = arrayText[index];
    }

    if (id == "project-window") {
        preloadProjectImage();
    }
}

function putSlideInAnimation(window) {
    window.classList.remove('hidden');
    window.classList.add('open');
}

//------------------------------------ Open Content Windows ------------------------------------------------------

iconContainers.forEach(iconContainer => {
    iconContainer.addEventListener('click', () => {
        const array = iconContainer.getAttribute('data-target').split("/");
        const windowId = array[0];
        const programeId = array[1];

        programsWindow.setAttribute("data-target", programeId);

        fillTopBar(programsWindowTopBarIcon, programsWindowTopBarName,
            iconContainer.getAttribute('data-src'), iconContainer.getAttribute('data-text'));
        fillContentWindow(windowId);

        showContentWindow(windowId);
        showOpenProgram(programeId, windowId, iconContainer.getAttribute('data-src'),
            iconContainer.getAttribute('data-text'));
    });
});

//--------------------------------------- Minimize Interactive Window ---------------------------------------------

//PRE: -
//POS: Change the background to an image or color
minimizeButton.addEventListener("click", function () {
    programsWindow.classList.add('hidden');
    setTimeout(() => {
        putSlideInAnimation(programsWindow);
        programsWindow.style.display = "none";
        closeContentWindows();
    }, 385);
});

//--------------------------------------- Close Interactive Window ------------------------------------------------

closeButton.addEventListener("click", function () {
    programsWindow.classList.add('hidden');
    const openProgram = document.getElementById(programsWindow.getAttribute("data-target"));
    openProgram.classList.add("hidden");
    setTimeout(() => {
        putSlideInAnimation(programsWindow);
        putSlideInAnimation(openProgram);
        closeMinimizedOpenProgram(programsWindow.getAttribute("data-target"));
        programsWindow.style.display = "none";
        closeContentWindows();
    }, 385);
});

//--------------------------------------- Close Help Window ------------------------------------------------

helpCloseButton.addEventListener("click", function () {
    helpWindow.style.animation = 'slideOutHelpWindow 0.4s ease-in-out';
    setTimeout(() => {
        helpWindow.style.display = "none";
    }, 385);
});

//----------------------------------- Close Project Information Window --------------------------------------
//projectInformationWindow

projectCloseButton.addEventListener("click", function () {
    projectInformationWindow.classList.add('hidden');
    setTimeout(() => {
        putSlideInAnimation(projectInformationWindow);
        closeProjectWindows();
    }, 385);
});

mobileProjectCloseButton.addEventListener("click", function () {
    mobileProjectInformationWindow.classList.add('hidden');
    setTimeout(() => {
        putSlideInAnimation(mobileProjectInformationWindow);
        closeProjectWindows();
    }, 385);
});

//--------------------------------------- AboutMe Information related functionality --------------------------------

const rightButton = document.getElementById("right-button");
const leftButton = document.getElementById("left-button");
const aboutMeText = document.getElementById("aboutMe-text-container");

let index = 0;
const arrayText = [];
arrayText[0] = "¡Hola! Soy <strong>Juan</strong>, desarrollador front-end de Uruguay. Este es mi sitio web, " +
"un lugar donde comparto mis proyectos y permito que las personas conozcan un poco más sobre mí." +
"<br><br>En esta sección, comparto mis intereses personales, pero si estás buscando información relevante " +
"para fines profesionales, te invito a explorar la sección de proyectos y habilidades.";

arrayText[1] = "Como podrás notar, soy un amante de la tecnología. En ocasiones, mi trabajo se convierte en un pasatiempo, " +
"fusionando mis intereses personales con mis proyectos profesionales.<br><br>Además, mis intereses abarcan campos tan diversos " +
"como la astronomía  &#10024 , la biología &#x1F331 y, por supuesto, los videojuegos &#x1F47E;.";

function changeArrayTextDependingOnWindowWidth() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 600) {
        arrayText[0] = "¡Hola! Soy <strong>Juan</strong>, desarrollador front-end de Uruguay. Este es mi sitio web, " +
            "un lugar donde comparto mis proyectos y permito que las personas conozcan un poco más sobre mí.";

        arrayText[1] = "En esta sección, comparto mis intereses personales, pero si estás buscando información relevante " +
            "para fines profesionales, te invito a explorar la sección de proyectos y habilidades.";

        arrayText[2] = "Como podrás notar, soy un amante de la tecnología. En ocasiones, mi trabajo se convierte en un pasatiempo, " +
            "fusionando mis intereses personales con mis proyectos profesionales.<br><br>Además, mis intereses abarcan campos tan diversos " +
            "como la astronomía  &#10024 , la biología &#x1F331 y, por supuesto, los videojuegos &#x1F47E;.";
    }
}

function applySlideInAboutMeTextAnimation() {
    aboutMeText.classList.remove("open");
    void aboutMeText.offsetWidth; //reinicia la animacion
    aboutMeText.classList.add("open");
}

rightButton.addEventListener("click", function () {
    if (index < arrayText.length - 1) {
        leftButton.style.color = "black";
        if (index == arrayText.length - 2) {
            rightButton.style.color = "#9b9b9b";
        }
        index++;
        aboutMeText.innerHTML = arrayText[index];
        applySlideInAboutMeTextAnimation();
    }
});

leftButton.addEventListener("click", function () {
    if (index > 0) {
        rightButton.style.color = "black";
        if (index == 1) {
            leftButton.style.color = "#9b9b9b";
        }
        index--;
        aboutMeText.innerHTML = arrayText[index];
        applySlideInAboutMeTextAnimation();
    }
});

//--------------------------------------- Text moves towards mouse effect ------------------------------------------

const title1 = document.getElementById("title1");
const title2 = document.getElementById("title2");

aboutMeWindow.addEventListener("mousemove", function (event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    const xOffset1 = (mouseX / window.innerWidth) * 8;
    const yOffset1 = (mouseY / window.innerHeight) * 8;

    const xOffset2 = (mouseX / window.innerWidth) * 14;
    const yOffset2 = (mouseY / window.innerHeight) * 14;

    title1.style.transform = `translate(${xOffset1}px, ${yOffset1}px)`;
    title2.style.transform = `translate(${xOffset2}px, ${yOffset2}px)`;
});

//------------------------------------------ Change Background --------------------------------------------

//PRE: -
//POS: Change the background to an image or color
backgroundChange.addEventListener("click", function () {
    const state = backgroundChange.getAttribute("data-state");
    const iconTexts = document.querySelectorAll(".icon-text");

    if(state == "off"){
        document.body.style.backgroundImage = "url(img/backgrounds/background.webp)";

        iconTexts.forEach(text => {
            text.style.backgroundColor = "rgb(2, 2, 145)";
        });

        backgroundChange.setAttribute("data-state", "on");

    }else{
        document.body.style.backgroundColor = "#007e7d";
        document.body.style.backgroundImage = "none";

        iconTexts.forEach(text => {
            text.style.backgroundColor = "transparent";
        });

        backgroundChange.setAttribute("data-state", "off");
    }
});

//--------------------------------------- Horizontal Slide ------------------------------------------
const sliders = document.querySelectorAll(".projects-container");
let isDown = false;
let startX;
let scrollLeft;

sliders.forEach(slider => {
    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = "grabbing";
        console.log("mousedown");
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
        slider.style.cursor = "grab";
        console.log("mouseup");
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false; // Establecer isDown a falso cuando el mouse sale
        slider.classList.remove("active");
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return; // Verificación adicional
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        console.log("mousemove");
    });
});

//------------------------------------ Open Project Inforamtion Window ------------------------------------------------------

projects.forEach(project => {
    project.addEventListener("click", () => {
        const windowToOpen = project.getAttribute("data-target");
        const topBarName = project.getAttribute("data-name");
        const topBarIcon = project.getAttribute("data-src");

        helpWindow.style.display = "none";

        const windowWidth = window.innerWidth;

        if (windowWidth <= 820) {
            fillTopBar(mobileProjectContainerTopBarIcon, mobileProjectContainerTopBarName, topBarIcon, topBarName);
        } else {
            fillTopBar(projectContainerTopBarIcon, projectContainerTopBarName, topBarIcon, topBarName);
        }

        showProjectWindow(windowToOpen);
    });
});

const startButton = document.getElementById("start-button-container");
const startMenu = document.getElementById("start-menu");
startButton.addEventListener("click", () => {
    openCloseStartMenu();
});

function openCloseStartMenu() {
    const display = window.getComputedStyle(startMenu, null).getPropertyValue("display");
    if (display == "none") {
        startMenu.style.display = "flex";
    } else {
        startMenu.style.display = "none";
    }
}

const startComputerButton = document.getElementById("start");
const computerScreen = document.getElementById("computerScreen");
const hijos = computerScreen.children;
const greenLight = document.getElementById("greenLight");
const redLight = document.getElementById("redLight");

startComputerButton.addEventListener("click", () => {
    const state = computerScreen.getAttribute("data-state");

    if (state == "on") {
        for (var i = 0; i < hijos.length; i++) {
            hijos[i].style.animation = "hideChildElements 0.5s forwards";
        }

        computerScreen.setAttribute("data-state", "off");

        greenLight.style.animation = "none";
        greenLight.offsetHeight;
        redLight.style.backgroundColor = "rgb(243, 0, 0)";

    } else {

        for (var i = 0; i < hijos.length; i++) {
            hijos[i].style.animation = "showChildElements 0.5s forwards";
        }

        computerScreen.setAttribute("data-state", "on");

        redLight.style.backgroundColor = "rgb(83, 54, 54)";
        greenLight.style.animation = "blink 2.5s infinite ease-out";
    }
});

const linkProjects = document.getElementById("linkProjects");

linkProjects.addEventListener("click", () => {
    const array = linkProjects.getAttribute('data-target').split("/");
    const windowId = array[0];
    const programeId = array[1];

    programsWindow.setAttribute("data-target", programeId);

    fillTopBar(programsWindowTopBarIcon, programsWindowTopBarName,
        linkProjects.getAttribute('data-src'), linkProjects.getAttribute('data-text'));
    fillContentWindow(windowId);

    showContentWindow(windowId);
    showOpenProgram(programeId, windowId, linkProjects.getAttribute('data-src'),
        linkProjects.getAttribute('data-text'));
});

const links = document.querySelectorAll(".link");
links.forEach(link => {
    link.addEventListener('click', () => {
        openCloseStartMenu();
    });
});

const arrayImages = document.querySelectorAll(".preloadProjectImage")
const preloadedImagesContainer = document.getElementById("preloaded-images-container");

function preloadProjectImage() {
    arrayImages.forEach(img => {

        const newImage = document.createElement('img');
        newImage.src = img.src;
        newImage.classList.add('preloaded-images');
        preloadedImagesContainer.appendChild(newImage);
    });
}