document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize CountUp instances for statistics
    const employeeCount = new CountUp('employeeCount', 0, 800, 0, 2.5, {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
    });

    const branchCount = new CountUp('branchCount', 0, 90, 0, 2.5, {
        useEasing: true,
        useGrouping: true
    });

    const experienceCount = new CountUp('experienceCount', 0, 20, 0, 2.5, {
        useEasing: true,
        useGrouping: true
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Start counter animations when stats container comes into view
    const statsContainer = document.querySelector('.stats-container');
    let countersStarted = false;

    function handleScroll() {
        if (!countersStarted && isInViewport(statsContainer)) {
            employeeCount.start();
            branchCount.start();
            experienceCount.start();
            countersStarted = true;
            // Remove scroll listener once counters have started
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Check initial viewport state
    handleScroll();

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Toggle between menu and x icon
        const menuIcon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons(); // Refresh icons
    });

    // Value cards hover effect
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation for content sections
    const fadeElements = document.querySelectorAll('.hero-section, .main-content, .values-section');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, fadeInOptions);

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        fadeInObserver.observe(element);
    });

    // Add this CSS to your about.css file for the fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}); 