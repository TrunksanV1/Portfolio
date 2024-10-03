document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectLink = card.getAttribute('data-link');
            if (projectLink != null) {
                window.open(projectLink, '_blank');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Fonction pour changer de section
    function changeSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                section.classList.remove('hidden');
            } else {
                section.classList.remove('active');
                section.classList.add('hidden');
            }
        });
    }

    // Ajouter des événements sur les liens du menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Enlever l'active des autres liens
            navLinks.forEach(l => l.classList.remove('active'));

            // Activer le lien cliqué
            link.classList.add('active');

            // Afficher la section correspondante
            const sectionId = link.getAttribute('data-section');
            changeSection(sectionId);
        });
    });

    // Activer la première section par défaut
    changeSection('about-me');
});
