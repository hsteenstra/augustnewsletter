/* =========================================================
   CODE FOR ME — SUMMER 2026 NEWSLETTER
   Interactive JavaScript
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        menuToggle.textContent =
            navMenu.classList.contains("open")
                ? "×"
                : "☰";

    });


    // Close menu when clicking a navigation link

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

});


/* =========================================================
   DARK MODE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("codeForMeTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "codeForMeTheme",
            isDark ? "dark" : "light"
        );

    });

}


/* =========================================================
   ANIMATED STAT NUMBERS
========================================================= */

const statNumbers =
    document.querySelectorAll(".stat-number");

let statsAnimated = false;


function animateStats() {

    if (statsAnimated) return;

    statsAnimated = true;

    statNumbers.forEach(number => {

        const target =
            number.dataset.target;

        if (target === "∞") {
            number.textContent = "∞";
            return;
        }

        const finalNumber =
            parseInt(target);

        let current = 0;

        const duration = 1200;

        const startTime = performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.floor(finalNumber * eased);

            number.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                number.textContent =
                    finalNumber;

            }

        }


        requestAnimationFrame(update);

    });

}


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    entry.target.classList.contains(
                        "stats-grid"
                    )
                ) {

                    animateStats();

                }

            });

        },
        {
            threshold: 0.25
        }
    );


const statsGrid =
    document.querySelector(".stats-grid");

if (statsGrid) {
    observer.observe(statsGrid);
}


/* =========================================================
   CODECOURSE
========================================================= */

const lessons = [

    {
        title: "Getting Started",

        description:
            "Your first step into programming. Learn what code is, how programs work, and write your first Python command.",

        code:
            'print("Hello, Code For ME!")',

        output:
            "Hello, Code For ME!"
    },


    {
        title: "Variables",

        description:
            "Variables let your programs remember information. Store names, numbers, scores, and just about anything else.",

        code:
            'name = "Code For ME"\\nprint(name)',

        output:
            "Code For ME"
    },


    {
        title: "Input",

        description:
            "Make your programs interactive by allowing the person using them to give your code information.",

        code:
            'name = input("What is your name? ")\\nprint("Hi, " + name + "!")',

        output:
            "Hi, coder!"
    },


    {
        title: "Conditionals",

        description:
            "Teach your program how to make decisions using if statements.",

        code:
            'score = 95\\n\\nif score >= 90:\\n    print("Amazing!")',

        output:
            "Amazing!"
    },


    {
        title: "Loops",

        description:
            "Loops allow your code to repeat an action. This is where programs can start becoming seriously powerful.",

        code:
            'for i in range(5):\\n    print("Code!")',

        output:
            "Code! Code! Code! Code! Code!"
    },


    {
        title: "Build Something",

        description:
            "Put everything together and use your new skills to build something that is completely your own.",

        code:
            'message = "I built this!"\\nprint(message)',

        output:
            "I built this!"
    }

];


const lessonButtons =
    document.querySelectorAll(".lesson");


const lessonTitle =
    document.getElementById("lessonTitle");


const lessonDescription =
    document.getElementById("lessonDescription");


const lessonCode =
    document.getElementById("lessonCode");


const lessonOutput =
    document.getElementById("lessonOutput");


const lessonNumber =
    document.getElementById("lessonNumber");


const lessonBreadcrumb =
    document.getElementById("lessonBreadcrumb");


const courseProgress =
    document.getElementById("courseProgress");


const coursePercent =
    document.getElementById("coursePercent");


function loadLesson(index) {

    const lesson =
        lessons[index];

    if (!lesson) return;


    lessonButtons.forEach((button, buttonIndex) => {

        button.classList.toggle(
            "active",
            buttonIndex === index
        );

    });


    if (lessonTitle) {
        lessonTitle.textContent =
            lesson.title;
    }


    if (lessonDescription) {
        lessonDescription.textContent =
            lesson.description;
    }


    if (lessonCode) {
        lessonCode.textContent =
            lesson.code;
    }


    if (lessonOutput) {
        lessonOutput.textContent =
            lesson.output;
    }


    const number =
        String(index + 1).padStart(2, "0");


    if (lessonNumber) {
        lessonNumber.textContent =
            `LESSON ${number}`;
    }


    if (lessonBreadcrumb) {
        lessonBreadcrumb.textContent =
            `LESSON ${number} / 06`;
    }


    const percentage =
        Math.round(
            ((index + 1) / lessons.length) * 100
        );


    if (courseProgress) {
        courseProgress.style.width =
            `${percentage}%`;
    }


    if (coursePercent) {
        coursePercent.textContent =
            `${percentage}%`;
    }

}


lessonButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        loadLesson(index);

    });

});


/* =========================================================
   COPY CODE BUTTON
========================================================= */

const copyCode =
    document.getElementById("copyCode");


if (copyCode) {

    copyCode.addEventListener("click", async () => {

        const text =
            lessonCode.textContent;


        try {

            await navigator.clipboard.writeText(text);

            copyCode.textContent =
                "Copied! ✓";


            setTimeout(() => {

                copyCode.textContent =
                    "Copy";

            }, 1500);

        } catch (error) {

            copyCode.textContent =
                "Select code";

            setTimeout(() => {

                copyCode.textContent =
                    "Copy";

            }, 1500);

        }

    });

}


/* =========================================================
   JULY CAMP TABS
========================================================= */

const campTabs =
    document.querySelectorAll(".camp-tab");


const campPanels =
    document.querySelectorAll(".camp-panel");


campTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selectedCamp =
            tab.dataset.camp;


        campTabs.forEach(item => {

            item.classList.remove("active");

        });


        tab.classList.add("active");


        campPanels.forEach(panel => {

            panel.classList.remove("active");

        });


        const selectedPanel =
            document.getElementById(selectedCamp);


        if (selectedPanel) {

            selectedPanel.classList.add("active");

        }

    });

});


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

const galleryImages =
    document.querySelectorAll(".gallery-image");


const lightbox =
    document.getElementById("lightbox");


const lightboxImage =
    document.getElementById("lightboxImage");


const lightboxClose =
    document.getElementById("lightboxClose");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        if (!lightbox || !lightboxImage) return;


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.alt;


        lightbox.classList.add("open");


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    });

});


function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove("open");


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "lightbox-open"
    );

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================================================
   BROWN UNIVERSITY — STAR FIELD
========================================================= */

const starField =
    document.getElementById("starField");


if (starField) {

    const starCount =
        window.innerWidth < 600
            ? 70
            : 130;


    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("span");


        star.className =
            "generated-star";


        const size =
            Math.random() * 3 + 1;


        star.style.width =
            `${size}px`;


        star.style.height =
            `${size}px`;


        star.style.left =
            `${Math.random() * 100}%`;


        star.style.top =
            `${Math.random() * 100}%`;


        star.style.animationDelay =
            `${Math.random() * 4}s`;


        starField.appendChild(star);

    }

}


/* =========================================================
   BROWN UNIVERSITY — RUN THE EXPERIMENT
========================================================= */

const runResearch =
    document.getElementById("runResearch");


const logisticResult =
    document.getElementById("logisticResult");


const forestResult =
    document.getElementById("forestResult");


const researchResult =
    document.getElementById("researchResult");


const logisticComputer =
    document.getElementById("logisticComputer");


const forestComputer =
    document.getElementById("forestComputer");


let experimentRunning = false;


function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


async function runExperiment() {

    if (experimentRunning) return;

    experimentRunning = true;


    if (runResearch) {

        runResearch.disabled = true;

        runResearch.textContent =
            "Running Python experiment...";

    }


    if (researchResult) {

        researchResult.textContent =
            "Loading Gaia data...";

    }


    if (logisticResult) {

        logisticResult.textContent =
            "LOADING DATA...";

    }


    if (forestResult) {

        forestResult.textContent =
            "LOADING DATA...";

    }


    await sleep(1000);


    if (researchResult) {

        researchResult.textContent =
            "Python is analyzing the stars...";

    }


    if (logisticComputer) {

        logisticComputer.classList.add(
            "computing"
        );

    }


    if (forestComputer) {

        forestComputer.classList.add(
            "computing"
        );

    }


    if (logisticResult) {

        logisticResult.textContent =
            "ANALYZING...";

    }


    await sleep(1800);


    if (logisticResult) {

        logisticResult.textContent =
            "QUASAR DETECTED ✓";

    }


    if (researchResult) {

        researchResult.textContent =
            "Logistic Regression found a candidate.";

    }


    await sleep(1200);


    if (forestResult) {

        forestResult.textContent =
            "ANALYZING...";

    }


    await sleep(1800);


    if (forestResult) {

        forestResult.textContent =
            "QUASAR DETECTED ✓";

    }


    if (researchResult) {

        researchResult.textContent =
            "Both models identified the quasar.";

    }


    if (logisticComputer) {

        logisticComputer.classList.remove(
            "computing"
        );

        logisticComputer.classList.add(
            "success"
        );

    }


    if (forestComputer) {

        forestComputer.classList.remove(
            "computing"
        );

        forestComputer.classList.add(
            "success"
        );

    }


    await sleep(800);


    if (researchResult) {

        researchResult.innerHTML =
            "<strong>✓ Experiment complete.</strong> Python helped both models identify the quasar.";

    }


    if (runResearch) {

        runResearch.disabled = false;

        runResearch.textContent =
            "↻ Run it again";

    }


    experimentRunning = false;

}


if (runResearch) {

    runResearch.addEventListener(
        "click",
        runExperiment
    );

}


/* =========================================================
   CELEBRATION BUTTON
========================================================= */

const celebrateButton =
    document.getElementById(
        "celebrateButton"
    );


if (celebrateButton) {

    celebrateButton.addEventListener(
        "click",
        () => {

            createConfetti();

        }
    );

}


function createConfetti() {

    const symbols = [
        "✦",
        "✧",
        "●",
        "◆",
        "✦",
        "</>",
        "01"
    ];


    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}vw`;


        piece.style.animationDelay =
            `${Math.random() * 0.5}s`;


        piece.style.fontSize =
            `${Math.random() * 10 + 10}px`;


        document.body.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 3000);

    }

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .stat-card, .camp-story, .resource-card, .teacher-callout, .feature-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-ready"
    );


    revealObserver.observe(element);

});


/* =========================================================
   TEXTBOOK BUTTON
=========================================================

   Replace the "#" in index.html with your real
   textbook ordering URL.

========================================================= */

const textbookButton =
    document.getElementById(
        "textbookButton"
    );


if (textbookButton) {

    textbookButton.addEventListener(
        "click",
        event => {

            if (
                textbookButton.getAttribute("href") === "#"
            ) {

                event.preventDefault();


                alert(
                    "Add your textbook ordering link to this button in index.html!"
                );

            }

        }
    );

}


/* =========================================================
   MAINE PUBLIC BUTTON
========================================================= */

const mainePublicLink =
    document.getElementById(
        "mainePublicLink"
    );


if (mainePublicLink) {

    mainePublicLink.addEventListener(
        "click",
        event => {

            if (
                mainePublicLink.getAttribute("href") === "#"
            ) {

                event.preventDefault();


                alert(
                    "Add the Maine Public article URL to this button in index.html!"
                );

            }

        }
    );

}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   CURSOR GLOW — DESKTOP ONLY
========================================================= */

const cursorGlow =
    document.createElement("div");


cursorGlow.className =
    "cursor-glow";


document.body.appendChild(
    cursorGlow
);


if (window.matchMedia(
    "(pointer: fine)"
).matches) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;


            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   PARALLAX HERO
========================================================= */

const hero =
    document.querySelector(".hero");


const heroGrid =
    document.querySelector(".hero-grid");


if (
    hero &&
    heroGrid &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            heroGrid.style.transform =
                `translate(${x * 15}px, ${y * 15}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroGrid.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

loadLesson(0);


console.log(
    "%cCode For ME — Summer 2026",
    "font-size: 20px; font-weight: bold;"
);


console.log(
    "%cKeep building. Keep teaching. Keep coding.",
    "font-size: 14px;"
);

/* =========================================
   INTERACTIVE TEACHER NETWORK
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const network = document.getElementById("teacherNetwork");
    const nodes = document.querySelectorAll(".teacher-node");
    const counter = document.getElementById("teacherCount");
    const tooltip = document.getElementById("teacherTooltip");

    if (!network || !nodes.length) return;


    /* -----------------------------------------
       COUNTER ANIMATION
    ----------------------------------------- */

    let count = 0;

    const countUp = setInterval(() => {

        count++;

        counter.textContent = count;

        if (count >= 10) {
            clearInterval(countUp);
        }

    }, 180);


    /* =========================================
   TEACHER NETWORK ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const network = document.getElementById("teacherNetwork");
    const nodes = document.querySelectorAll(".teacher-node");
    const counter = document.getElementById("teacherCount");

    if (!network || !counter || !nodes.length) {
        return;
    }


    /* -----------------------------------------
       COUNT 0 → 10
    ----------------------------------------- */

    let count = 0;

    const counterAnimation = setInterval(function () {

        count++;

        counter.textContent = count;

        if (count === 10) {
            clearInterval(counterAnimation);
        }

    }, 150);


    /* -----------------------------------------
       TEACHER NODE INTERACTION
    ----------------------------------------- */

    nodes.forEach(function (node) {

        node.addEventListener("mouseenter", function () {

            nodes.forEach(function (otherNode) {

                if (otherNode !== node) {
                    otherNode.style.opacity = "0.25";
                }

            });

            node.style.opacity = "1";

        });


        node.addEventListener("mouseleave", function () {

            nodes.forEach(function (otherNode) {
                otherNode.style.opacity = "1";
            });

        });


        /* Click burst */

        node.addEventListener("click", function () {

            node.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.5)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 500,
                    easing: "ease-out"
                }
            );

        });

    });


    /* -----------------------------------------
       RANDOM TEACHER PULSE
    ----------------------------------------- */

    function pulseTeacher() {

        const randomIndex =
            Math.floor(Math.random() * nodes.length);

        const node = nodes[randomIndex];

        node.animate(
            [
                {
                    boxShadow:
                        "0 0 0 rgba(98,216,207,0)"
                },

                {
                    boxShadow:
                        "0 0 35px rgba(98,216,207,0.9)"
                },

                {
                    boxShadow:
                        "0 0 0 rgba(98,216,207,0)"
                }
            ],
            {
                duration: 1000,
                easing: "ease-in-out"
            }
        );

    }


    setInterval(pulseTeacher, 1200);

});
