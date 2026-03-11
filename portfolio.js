document.addEventListener('DOMContentLoaded', () => {
    // Redirection au clic sur les cartes projet
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
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
    const initialSection = (hash === 'projects') ? 'projects' : 'about-me';
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
});
