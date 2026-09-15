document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    // Check for saved theme preference or system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            if (themeIconMobile) themeIconMobile.classList.replace('fa-moon', 'fa-sun');
        } else {
            htmlElement.classList.remove('dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            if (themeIconMobile) themeIconMobile.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize theme
    setTheme(getPreferredTheme());

    // Toggle events
    const handleThemeToggle = () => {
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    themeToggleBtn.addEventListener('click', handleThemeToggle);
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', handleThemeToggle);
    }

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Certificate Gallery ---
    const certificates = [
        {
            title: 'Cybersecurity Foundation',
            org: 'Palo Alto Networks Cybersecurity Academy',
            date: 'February 26, 2026',
            img: 'Cybersecurity Foundation.jpg',
            pdf: 'Cybersecurity Foundation.pdf',
            category: 'Cyber Security'
        },
        {
            title: 'Network Security Fundamentals',
            org: 'Palo Alto Networks Cybersecurity Academy',
            date: 'June 27, 2026',
            img: '_Network Security Fundamentals.jpg',
            pdf: '_Network Security Fundamentals.pdf',
            category: 'Cyber Security'
        },
        {
            title: 'Introduction to Artificial Intelligence',
            org: 'Great Learning',
            date: 'July 16, 2026',
            img: 'Intro to AI.jpg',
            pdf: 'Intro to AI.pdf',
            category: 'Generative AI / AI'
        },
        {
            title: 'Introduction to Python',
            org: 'Infosys Springboard',
            date: 'June 24, 2026',
            img: 'Introduction to Python.jpg',
            pdf: 'Introduction to Python.pdf',
            category: 'Programming'
        },
        {
            title: 'Machine Learning Using Python',
            org: 'Great Learning',
            date: 'July 7, 2026',
            img: 'Machine learning Cert.jpg',
            pdf: 'Machine learning Cert.pdf',
            category: 'Generative AI / AI'
        },
        {
            title: 'Startup School',
            org: 'Parul Innovation & Entrepreneurship Research Centre (PIERC)',
            date: 'March 11–23, 2024',
            img: 'STARTUP SCHOOL CERTIFICATE.jpg',
            pdf: 'STARTUP SCHOOL CERTIFICATE.pdf',
            category: 'Other'
        },
        {
            title: 'Cyber Security Tutorial Module',
            org: 'Scaler Topics',
            date: 'N/A',
            img: 'scaler Cyber Security Tutorial.jpg',
            pdf: 'scaler Cyber Security Tutorial.pdf',
            category: 'Cyber Security'
        }
    ];

    const certGallery = document.getElementById('cert-gallery');
    
    // Render Certificates
    certificates.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'card overflow-hidden group cursor-pointer flex flex-col h-full';
        certCard.dataset.index = index;
        
        certCard.innerHTML = `
            <div class="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img src="${cert.img}" alt="${cert.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 lazyload">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${cert.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">${cert.org}</p>
                <div class="flex justify-between items-center mt-auto">
                    <span class="text-xs font-semibold text-primary dark:text-secondary">${cert.date !== 'N/A' ? cert.date : ''}</span>
                    <button class="text-sm font-medium text-primary dark:text-secondary hover:underline view-cert-btn">View</button>
                </div>
            </div>
        `;
        
        certGallery.appendChild(certCard);

        // Click event to open modal
        certCard.addEventListener('click', () => openModal(index));
    });

    // --- Modal Logic ---
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalOrg = document.getElementById('modal-org');
    const modalDate = document.getElementById('modal-date');
    const modalPdfLink = document.getElementById('modal-pdf-link');
    
    const closeBtn = document.getElementById('modal-close');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const overlay = document.getElementById('modal-overlay');

    let currentCertIndex = 0;

    const updateModalContent = (index) => {
        const cert = certificates[index];
        modalImg.src = cert.img;
        modalTitle.textContent = cert.title;
        modalOrg.textContent = cert.org;
        modalDate.textContent = cert.date !== 'N/A' ? cert.date : '';
        modalPdfLink.href = cert.pdf;
    };

    const openModal = (index) => {
        currentCertIndex = index;
        updateModalContent(index);
        
        modal.classList.remove('hidden');
        // Small delay to allow display block to apply before opacity transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
        }, 10);
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // match transition duration
        document.body.classList.remove('modal-open');
    };

    const nextCert = (e) => {
        e.stopPropagation();
        currentCertIndex = (currentCertIndex + 1) % certificates.length;
        updateModalContent(currentCertIndex);
    };

    const prevCert = (e) => {
        e.stopPropagation();
        currentCertIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
        updateModalContent(currentCertIndex);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', nextCert);
    prevBtn.addEventListener('click', prevCert);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextCert(e);
            if (e.key === 'ArrowLeft') prevCert(e);
        }
    });
});
