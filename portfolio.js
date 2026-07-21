document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer pour les animations au défilement (scroll-animate)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Si c'est la bannière des stats, on lance l'animation des nombres
                if (entry.target.classList.contains('stats-banner')) {
                    if (typeof animateStats === 'function') {
                        animateStats();
                    }
                }

                observer.unobserve(entry.target); // Ne l'animer qu'une seule fois
            }
        });
    }, observerOptions);

    // Initialiser l'observation pour les éléments scroll-animate
    function initScrollAnimations() {
        document.querySelectorAll('.scroll-animate').forEach(el => {
            el.classList.remove('visible'); // Reset if needed
            scrollObserver.observe(el);
        });
    }

    // Redirection au clic sur les cartes projet
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const downloadLink = card.getAttribute('data-download');
            if (downloadLink) {
                const a = document.createElement('a');
                a.href = downloadLink;
                a.download = '';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                return;
            }
            const projectLink = card.getAttribute('data-link');
            if (projectLink != null) {
                if (projectLink.startsWith('http')) {
                    window.open(projectLink, '_blank');
                } else {
                    window.location.href = projectLink;
                }
            }
        });
    });

    // Redirection au clic sur les cartes expérience cliquables
    const experienceCards = document.querySelectorAll('.experience-card-link');
    experienceCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                if (link.startsWith('http')) {
                    window.open(link, '_blank');
                } else {
                    window.location.href = link;
                }
            }
        });
    });

    // Navigation entre sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    function changeSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                section.classList.remove('hidden');
                // Animer les cartes projet quand la section projets est activée
                if (sectionId === 'projects') {
                    animateCards();
                }
                // Animer les timeline items quand la section expériences est activée
                if (sectionId === 'experiences') {
                    animateTimeline();
                }
                // Réinitialiser les animations scroll quand on revient sur about-me
                if (sectionId === 'about-me' && typeof initScrollAnimations === 'function') {
                    initScrollAnimations();
                }
            } else {
                section.classList.remove('active');
                section.classList.add('hidden');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const sectionId = link.getAttribute('data-section');
            changeSection(sectionId);
        });
    });

    // Activer la section selon le hash de l'URL, ou about-me par défaut
    const hash = window.location.hash.replace('#', '');
    const initialSection = ['projects', 'experiences'].includes(hash) ? hash : 'about-me';
    changeSection(initialSection);
    // Nettoyer le hash pour que F5 revienne toujours sur l'accueil
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
    }
    // Mettre à jour le lien actif dans la nav
    navLinks.forEach(l => {
        if (l.getAttribute('data-section') === initialSection) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });

    // Animation d'apparition des cartes
    function animateCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                card.classList.add('visible');
            }, 50);
        });
    }

    // Animation d'apparition des timeline items
    function animateTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.classList.remove('visible');
            setTimeout(() => {
                item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
                item.classList.add('visible');
            }, 50);
        });
    }


    // Call it initially if on about-me
    if (initialSection === 'about-me') {
        initScrollAnimations();
    }

    // Animation des compteurs de statistiques
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 secondes
            const increment = target / (duration / 16); // ~60 FPS

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    }
});
