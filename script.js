/* =========================================
   CODE FOR ME — SUMMER 2026
   JAVASCRIPT
   ========================================= */


/* =========================================
   MOBILE MENU
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    if (navMenu.classList.contains("open")) {
        menuToggle.textContent = "×";
    } else {
        menuToggle.textContent = "☰";
    }
});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.textContent = "☰";

    });

});


/* =========================================
   DARK MODE
   ========================================= */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "codeForMeDarkMode",
        dark
    );

});


if (
    localStorage.getItem("codeForMeDarkMode")
    === "true"
) {
    document.body.classList.add("dark");
}


/* =========================================
   SCROLL PROGRESS
   ========================================= */

const progressBar =
    document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width =
        `${progress}%`;

});


/* =========================================
   ANIMATED STATS
   ========================================= */

const statNumbers =
    document.querySelectorAll(".stat-number");

let statsAnimated = false;


function animateStats() {

    if (statsAnimated) return;

    statsAnimated = true;

    statNumbers.forEach(number => {

        const target =
            number.dataset.target;

        if (!target || target === "∞") return;

        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 20)
            );

        const interval =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(interval);

                }

                number.textContent =
                    current;

            }, 55);

    });

}


const statsObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateStats();
                }

            });

        },
        {
            threshold: .3
        }
    );


const statsSection =
    document.querySelector(".stats-grid");

if (statsSection) {
    statsObserver.observe(statsSection);
}


/* =========================================
   REVEAL ANIMATIONS
   ========================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .teacher-callout, .feature-card"
    );


revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .08
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   COURSE LESSON DATA
   ========================================= */

const lessons = [

    {
        title: "Getting Started",
        description:
            "Your first step into programming. Learn what code is, how programs work, and write your first Python command.",
        code:
            'print("Hello, Code For ME!")',
        output:
            "Hello, Code For ME!",
        percent: 17
    },

    {
        title: "Variables",
        description:
            "Give information a name. Variables let your programs remember things and use them later.",
        code:
            'name = "Maine"',
        output:
            "Maine",
        percent: 33
    },

    {
        title: "Input",
        description:
            "Make your programs interactive by allowing the person using them to enter information.",
        code:
            'name = input("What is your name?")',
        output:
            "What is your name?",
        percent: 50
    },

    {
        title: "Conditionals",
        description:
            "Teach your program how to make decisions using if and else statements.",
        code:
            'if score > 10:\n    print("Great job!")',
        output:
            "Great job!",
        percent: 67
    },

    {
        title: "Loops",
        description:
            "Repeat code without writing the same thing over and over again.",
        code:
            'for i in range(5):\n    print(i)',
        output:
            "0 1 2 3 4",
        percent: 83
    },

    {
        title: "Build Something",
        description:
            "Bring everything together and build something that is actually yours.",
        code:
            'print("I built this!")',
        output:
            "I built this!",
        percent: 100
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

    lessonButtons.forEach(button => {
        button.classList.remove("active");
    });

    lessonButtons[index]
        .classList.add("active");

    lessonTitle.textContent =
        lesson.title;

    lessonDescription.textContent =
        lesson.description;

    lessonCode.textContent =
        lesson.code;

    lessonOutput.textContent =
        lesson.output;

    lessonNumber.textContent =
        `LESSON ${String(index + 1).padStart(2, "0")}`;

    lessonBreadcrumb.textContent =
        `LESSON ${String(index + 1).padStart(2, "0")} / 06`;

    courseProgress.style.width =
        `${lesson.percent}%`;

    coursePercent.textContent =
        `${lesson.percent}%`;

}


lessonButtons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(
                button.dataset.lesson
            );

        loadLesson(index);

    });

});


/* =========================================
   COPY CODE
   ========================================= */

const copyButton =
    document.getElementById("copyCode");

copyButton.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            lessonCode.textContent
        );

        copyButton.textContent =
            "Copied!";

        setTimeout(() => {

            copyButton.textContent =
                "Copy";

        }, 1400);

    } catch (error) {

        copyButton.textContent =
            "Copy failed";

    }

});


/* =========================================
   CAMP TABS
   ========================================= */

const campTabs =
    document.querySelectorAll(".camp-tab");

const campPanels =
    document.querySelectorAll(".camp-panel");


campTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selected =
            tab.dataset.camp;

        campTabs.forEach(item => {
            item.classList.remove("active");
        });

        campPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        tab.classList.add("active");

        document
            .getElementById(selected)
            .classList.add("active");

    });

});


/* =========================================
   PHOTO LIGHTBOX
   ========================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


document.querySelectorAll(".gallery-image")
    .forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;

            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

        });

    });


function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {
            closeLightbox();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {
            closeLightbox();
        }

    }
);


/* =========================================
   RESEARCH STAR FIELD
   ========================================= */

const starField =
    document.getElementById("starField");


function createStars() {

    if (!starField) return;

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const star =
            document.createElement("span");

        star.className = "star";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.opacity =
            `${Math.random() * .7 + .2}`;

        const size =
            Math.random() * 3 + 1;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        starField.appendChild(star);

    }

}


createStars();


/* =========================================
   RESEARCH ANIMATION
   ========================================= */

const runResearch =
    document.getElementById("runResearch");


runResearch.addEventListener(
    "click",
    () => {

        runResearch.textContent =
            "⟳ Analyzing Gaia data...";

        const stars =
            document.querySelectorAll(".star");

        stars.forEach((star, index) => {

            setTimeout(() => {

                star.style.transform =
                    "scale(2)";

                star.style.opacity =
                    "1";

            }, index * 12);

        });


        setTimeout(() => {

            runResearch.textContent =
                "✓ Quasar candidates identified";

        }, 1800);


        setTimeout(() => {

            runResearch.textContent =
                "▶ Run the experiment";

        }, 4000);

    }
);


/* =========================================
   CELEBRATE BUTTON
   ========================================= */

const celebrateButton =
    document.getElementById(
        "celebrateButton"
    );


celebrateButton.addEventListener(
    "click",
    () => {

        createConfetti();

        celebrateButton.textContent =
            "✦ Summer = success!";

        setTimeout(() => {

            celebrateButton.textContent =
                "✦ Celebrate with us";

        }, 2500);

    }
);


function createConfetti() {

    const pieces = 70;

    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.style.position =
            "fixed";

        piece.style.left =
            `${Math.random() * 100}vw`;

        piece.style.top =
            "-10px";

        piece.style.width =
            `${Math.random() * 8 + 5}px`;

        piece.style.height =
            `${Math.random() * 12 + 6}px`;

        piece.style.background =
            [
                "#df756f",
                "#58b7b2",
                "#f2bd32",
                "#4c82a5"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];

        piece.style.zIndex =
            "5000";

        piece.style.borderRadius =
            "2px";

        document.body.appendChild(piece);


        const duration =
            Math.random() * 1800 + 1800;

        const drift =
            Math.random() * 200 - 100;


        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${drift}px, 110vh) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );


        setTimeout(() => {
            piece.remove();
        }, duration);

    }

}


/* =========================================
   SMOOTH MAINE PUBLIC PLACEHOLDER
   ========================================= */

const mainePublicLink =
    document.getElementById(
        "mainePublicLink"
    );


mainePublicLink.addEventListener(
    "click",
    event => {

        if (
            mainePublicLink.getAttribute("href")
            === "#"
        ) {

            event.preventDefault();

            alert(
                "Add the Maine Public article URL to index.html first!"
            );

        }

    }
);


/* =========================================
   BACK TO TOP
   ========================================= */

window.addEventListener(
    "load",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }
);
