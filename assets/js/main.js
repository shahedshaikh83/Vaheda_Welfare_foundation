/* ===================================
   VAHEDA Trust Website - Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
  try {
    initHeader();
    initMobileMenu();
    initHeroSlider();
    initTabs();
    initFilters();
    initForms();
    initToast();
  } catch (e) {
    console.warn('Initialization error:', e);
  }
});

/* ===================================
   HEADER
   =================================== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  setActiveNavLink();
}

function setActiveNavLink() {
  let currentPage = '';
  
  const pathname = window.location.pathname;
  const href = window.location.href;
  
  if (pathname && pathname !== '/') {
    currentPage = pathname.split('/').pop();
  } else if (href) {
    currentPage = href.split('/').pop().split('?')[0].split('#')[0];
  }
  
  if (!currentPage || currentPage === '') {
    currentPage = 'index.html';
  }
  
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;
    
    const linkPage = linkHref.split('/').pop().split('?')[0].split('#')[0];
    
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if ((currentPage === '' || currentPage === 'index.html') && (linkPage === '' || linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===================================
   MOBILE MENU
   =================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', function() {
    const isOpen = mobileNav.classList.contains('open');
    
    if (isOpen) {
      mobileNav.classList.remove('open');
      menuBtn.innerHTML = getMenuIcon();
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('open');
      menuBtn.innerHTML = getCloseIcon();
      document.body.style.overflow = 'hidden';
    }
  });

  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('open');
      menuBtn.innerHTML = getMenuIcon();
      document.body.style.overflow = '';
    });
  });
}

function getMenuIcon() {
  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
}

function getCloseIcon() {
  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
}

/* ===================================
   HERO SLIDER
   =================================== */
let currentSlide = 0;
let slideInterval = null;
let hasSlider = false;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-nav-dot');
  
  if (!slides || slides.length === 0) {
    hasSlider = false;
    return;
  }
  
  hasSlider = true;

  showSlide(0);
  startSlideshow();

  if (dots && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        showSlide(index);
        resetSlideshow();
      });
    });
  }
}

function showSlide(index) {
  if (!hasSlider) return;
  
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-nav-dot');
  
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  currentSlide = index;

  slides.forEach((slide, i) => {
    if (slide) {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    }
  });

  if (dots && dots.length > 0) {
    dots.forEach((dot, i) => {
      if (dot) {
        dot.classList.remove('active');
        if (i === index) {
          dot.classList.add('active');
        }
      }
    });
  }
}

function nextSlide() {
  if (!hasSlider) return;
  showSlide(currentSlide + 1);
}

function startSlideshow() {
  if (!hasSlider) return;
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideshow() {
  if (!hasSlider) return;
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  startSlideshow();
}

/* ===================================
   TABS
   =================================== */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  if (!tabContainers || tabContainers.length === 0) return;
  
  tabContainers.forEach(container => {
    if (!container) return;
    
    const triggers = container.querySelectorAll('.tab-trigger');
    const contents = container.querySelectorAll('.tab-content');
    
    if (!triggers || triggers.length === 0) return;
    
    triggers.forEach(trigger => {
      if (!trigger) return;
      
      trigger.addEventListener('click', function() {
        const targetId = this.getAttribute('data-tab');
        
        triggers.forEach(t => {
          if (t) t.classList.remove('active');
        });
        this.classList.add('active');
        
        if (contents && contents.length > 0) {
          contents.forEach(content => {
            if (content) {
              content.classList.remove('active');
              if (content.id === targetId) {
                content.classList.add('active');
              }
            }
          });
        }
      });
    });
  });
}

/* ===================================
   FILTERS (Library & Blog)
   =================================== */
function initFilters() {
  const filterButtons = document.querySelectorAll('[data-filter-category]');
  
  if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      if (!btn) return;
      
      btn.addEventListener('click', function() {
        const category = this.getAttribute('data-filter-category');
        const container = document.querySelector('[data-filterable]');
        
        filterButtons.forEach(b => {
          if (b) {
            b.classList.remove('btn-primary');
            b.classList.add('btn-outline');
          }
        });
        this.classList.remove('btn-outline');
        this.classList.add('btn-primary');
        
        if (container) {
          const items = container.querySelectorAll('[data-category]');
          if (items && items.length > 0) {
            items.forEach(item => {
              if (item) {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                  item.style.display = '';
                } else {
                  item.style.display = 'none';
                }
              }
            });
          }
          checkNoResults(container);
        }
      });
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const container = document.querySelector('[data-filterable]');
      
      if (container) {
        const items = container.querySelectorAll('[data-searchable]');
        if (items && items.length > 0) {
          items.forEach(item => {
            if (item) {
              const text = (item.getAttribute('data-searchable') || '').toLowerCase();
              if (text.includes(query)) {
                item.style.display = '';
              } else {
                item.style.display = 'none';
              }
            }
          });
        }
        checkNoResults(container);
      }
    });
  }

  const typeFilters = document.querySelectorAll('[data-filter-type]');
  if (typeFilters && typeFilters.length > 0) {
    typeFilters.forEach(btn => {
      if (!btn) return;
      
      btn.addEventListener('click', function() {
        const type = this.getAttribute('data-filter-type');
        const container = document.querySelector('[data-filterable]');
        
        typeFilters.forEach(b => {
          if (b) b.classList.remove('active');
        });
        this.classList.add('active');
        
        if (container) {
          const items = container.querySelectorAll('[data-type]');
          if (items && items.length > 0) {
            items.forEach(item => {
              if (item) {
                if (type === 'all' || item.getAttribute('data-type') === type) {
                  item.style.display = '';
                } else {
                  item.style.display = 'none';
                }
              }
            });
          }
          checkNoResults(container);
        }
      });
    });
  }
}

function checkNoResults(container) {
  if (!container) return;
  
  const items = container.querySelectorAll('[data-category], [data-searchable], [data-type]');
  const noResults = document.getElementById('no-results');
  
  let visibleCount = 0;
  if (items && items.length > 0) {
    items.forEach(item => {
      if (item && item.style.display !== 'none') {
        visibleCount++;
      }
    });
  }
  
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

/* ===================================
   FORMS
   =================================== */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Message Sent!', 'Thank you for reaching out. We\'ll get back to you soon.');
      this.reset();
    });
  }

  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Application Submitted!', 'We\'ll review your application and get back to you soon.');
      this.reset();
    });
  }

  const partnerForm = document.getElementById('partner-form');
  if (partnerForm) {
    partnerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Inquiry Received!', 'Our partnership team will contact you within 48 hours.');
      this.reset();
    });
  }

  const donationAmounts = document.querySelectorAll('[data-donation-amount]');
  const customAmountInput = document.getElementById('custom-amount');
  
  if (donationAmounts && donationAmounts.length > 0) {
    donationAmounts.forEach(btn => {
      if (!btn) return;
      
      btn.addEventListener('click', function() {
        donationAmounts.forEach(b => {
          if (b) {
            b.classList.remove('btn-primary');
            b.classList.add('btn-outline');
          }
        });
        this.classList.remove('btn-outline');
        this.classList.add('btn-primary');
        if (customAmountInput) {
          customAmountInput.value = '';
        }
      });
    });
  }

  if (customAmountInput) {
    customAmountInput.addEventListener('focus', function() {
      if (donationAmounts && donationAmounts.length > 0) {
        donationAmounts.forEach(b => {
          if (b) {
            b.classList.remove('btn-primary');
            b.classList.add('btn-outline');
          }
        });
      }
    });
  }

  const donateBtn = document.getElementById('donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', function() {
      showToast('Thank you for your generosity!', 'You\'ll be redirected to the payment page shortly.');
    });
  }
}

/* ===================================
   TOAST NOTIFICATIONS
   =================================== */
let toastContainer = null;

function initToast() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(title, description) {
  if (!toastContainer) {
    initToast();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = '<div class="toast-title">' + title + '</div><div class="toast-description">' + description + '</div>';
  
  toastContainer.appendChild(toast);
  
  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(function() {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 5000);
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
