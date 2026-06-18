document.addEventListener("DOMContentLoaded", () => {
    
    // Lucide ikon motorunu başlatma
    lucide.createIcons();

    // --- Mobil Hamburger Menü Yönetimi ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            // İkonu dinamik değiştir (menu -> x)
            const icon = menuToggle.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.setAttribute("data-lucide", "x");
            } else {
                icon.setAttribute("data-lucide", "menu");
            }
            lucide.createIcons();
        });
    }

    // Menü linkine tıklandığında mobilde menüyü kapatma
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) navMenu.classList.remove("active");
            const icon = menuToggle?.querySelector("i");
            if (icon) {
                icon.setAttribute("data-lucide", "menu");
                lucide.createIcons();
            }
        });
    });

    // --- Akıllı Scroll (Kaydırma) Animasyonu (Intersection Observer) ---
    const scrollElements = document.querySelectorAll(".scroll-animate");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("in-view");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
        
        // Aktif Navigasyon Linkini Güncelleme
        let current = "";
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current) && current !== "") {
                link.classList.add("active");
            }
        });
    });

    // İlk açılış kontrolü
    handleScrollAnimation();

    // --- Lightbox / Tam Ekran Görsel Modalı ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const triggers = document.querySelectorAll(".lightbox-trigger");
    const closeBtn = document.querySelector(".close-lightbox");

    if (lightbox && lightboxImg) {
        triggers.forEach(trigger => {
            trigger.addEventListener("click", () => {
                lightbox.style.display = "block";
                lightboxImg.src = trigger.src;
                document.body.style.overflow = "hidden"; // Scroll engelle
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        };

        if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) closeLightbox();
        });
    }
});