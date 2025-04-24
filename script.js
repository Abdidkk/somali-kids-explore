
// Mock data
const mockChild = {
    name: "Sami",
    progress: 38,
    streak: 5,
    badges: ["Streak 3 dage", "Flittig Lærer"],
    lastCategory: "Tal",
    lastPercent: 30,
    finishedCategories: ["Alfabet"]
};

// DOM Elements
const modal = document.getElementById('alphabetModal');
const alphabetCard = document.querySelector('.category-card.alphabet');
const closeButton = document.querySelector('.close-button');

// Event Listeners
alphabetCard.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Back button functionality
document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});

// Hover card functionality for categories
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    const category = card.dataset.category;
    let hoverContent = '';
    
    if (category === 'alphabet') {
        hoverContent = `
            <ul>
                <li>Lære alle bogstaverne i det somaliske alfabet</li>
                <li>Øve udtale af hver bogstav</li>
                <li>Træne genkendelse af bogstaver</li>
                <li>Lære at skrive bogstaverne</li>
            </ul>
        `;
    } else if (category === 'colors') {
        hoverContent = `
            <ul>
                <li>Lære de grundlæggende farver</li>
                <li>Øve farvenavne på somalisk</li>
                <li>Lave sjove farveøvelser</li>
                <li>Lære at genkende farver i hverdagen</li>
            </ul>
        `;
    } else if (category === 'numbers') {
        hoverContent = `
            <ul>
                <li>Lære at tælle på somalisk</li>
                <li>Øve tal og mængder</li>
                <li>Træne grundlæggende matematik</li>
                <li>Lære tallenes navne og symboler</li>
            </ul>
        `;
    }

    // Create and add tooltip on hover
    card.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
            <h3>Lær om ${card.querySelector('h3').textContent}</h3>
            <p>I denne kategori vil du:</p>
            ${hoverContent}
        `;
        tooltip.style.cssText = `
            position: absolute;
            top: 50%;
            left: 105%;
            transform: translateY(-50%);
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            width: 300px;
            z-index: 10;
            display: none;
        `;
        card.appendChild(tooltip);
        setTimeout(() => tooltip.style.display = 'block', 100);
    });

    card.addEventListener('mouseleave', () => {
        const tooltip = card.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});
