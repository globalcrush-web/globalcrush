document.addEventListener('DOMContentLoaded', function () {

  // ===== 1. Mobile Menu Toggle =====
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== 2. Search Overlay =====
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = searchOverlay ? searchOverlay.querySelector('input') : null;

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', function () {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        setTimeout(function () { searchInput.focus(); }, 200);
      }
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===== 3. Back to Top =====
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== 4. FAQ Accordion =====
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const faqItem = this.closest('.faq-item');
      if (!faqItem) return;

      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(function (item) {
        item.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ===== 5. Category Filter (category.html) =====
  const filterTabs = document.querySelectorAll('.filter-tab');
  const filterCards = document.querySelectorAll('.filter-card, .article-card');

  if (filterTabs.length > 0 && filterCards.length > 0) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        var filterValue = this.getAttribute('data-filter');

        filterCards.forEach(function (card) {
          var cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.opacity = '0';
            card.style.height = card.offsetHeight + 'px';
            card.style.display = '';
            card.style.transition = 'none';

            requestAnimationFrame(function () {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';

            setTimeout(function () {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===== 6. Newsletter Form =====
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var successMsg = this.querySelector('.success-message');
      if (successMsg) {
        successMsg.textContent = 'Thanks for subscribing!';
        successMsg.style.display = 'block';
      }

      this.reset();

      if (successMsg) {
        setTimeout(function () {
          successMsg.style.display = 'none';
        }, 4000);
      }
    });
  }

  // ===== 7. Contact Form =====
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var successMsg = this.querySelector('.success-message');
      if (successMsg) {
        successMsg.textContent = "Message sent! We'll get back to you soon.";
        successMsg.style.display = 'block';
      }

      this.reset();

      if (successMsg) {
        setTimeout(function () {
          successMsg.style.display = 'none';
        }, 4000);
      }
    });
  }

  // ===== 8. Scroll Animations =====
  const animatedElements = document.querySelectorAll(
    '.article-card, .article-card-dual, .trending-item, .category-card, .faq-item'
  );

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.from(el.parentElement.children).filter(function (s) {
            return s.classList.contains('article-card') ||
                   s.classList.contains('article-card-dual') ||
                   s.classList.contains('trending-item') ||
                   s.classList.contains('category-card');
          });
          var index = siblings.indexOf(el);
          var delay = index >= 0 ? index * 80 : 0;

          setTimeout(function () {
            el.classList.add('visible');
          }, delay);

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== 9. Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (target.classList.contains('faq-item')) {
          if (!target.classList.contains('active')) {
            target.querySelector('.faq-question').click();
          }
        }
      }
    });
  });

  // ===== 10. View Counter Simulation =====
  var viewElements = document.querySelectorAll('[data-views]');

  viewElements.forEach(function (el) {
    var baseViews = parseInt(el.getAttribute('data-views'), 10);
    if (isNaN(baseViews)) return;

    var jitter = Math.floor(Math.random() * 200) - 100;
    var newViews = baseViews + jitter;

    if (newViews < 100) newViews = 100;
    el.textContent = newViews.toLocaleString();
  });

  // ===== 11. Social Share Buttons =====
  function shareOnFacebook(url, title) {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
      '_blank',
      'width=600,height=400'
    );
  }

  function shareOnTwitter(url, title) {
    window.open(
      'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title),
      '_blank',
      'width=600,height=400'
    );
  }

  function shareOnPinterest(url, title, image) {
    window.open(
      'https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) +
      '&media=' + encodeURIComponent(image) +
      '&description=' + encodeURIComponent(title),
      '_blank',
      'width=600,height=400'
    );
  }

  function shareOnWhatsApp(url, title) {
    window.open(
      'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url),
      '_blank'
    );
  }

  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var platform = this.getAttribute('data-share');
      var shareUrl = this.getAttribute('data-url') || window.location.href;
      var shareTitle = this.getAttribute('data-title') || document.title;
      var shareImage = this.getAttribute('data-image') || '';

      switch (platform) {
        case 'facebook':
          shareOnFacebook(shareUrl, shareTitle);
          break;
        case 'twitter':
          shareOnTwitter(shareUrl, shareTitle);
          break;
        case 'pinterest':
          shareOnPinterest(shareUrl, shareTitle, shareImage);
          break;
        case 'whatsapp':
          shareOnWhatsApp(shareUrl, shareTitle);
          break;
      }
    });
  });

  // ===== Close mobile menu on link click =====
  document.querySelectorAll('.mobile-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ===== Active nav link highlight =====
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== LIVE NEWS - GNews API =====
  async function loadLiveNews() {
    var grid = document.getElementById('liveNewsGrid');
    if (!grid) return;

    try {
      var response = await fetch('/api/news');
      var data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        grid.innerHTML = '<div class="live-loading"><i class="fas fa-newspaper"></i> Trending stories will appear here</div>';
        return;
      }

      var animClasses = ['img-zoom-rotate', 'img-3d-tilt', 'img-ken-burns', 'img-auto-rotate', 'img-float', 'img-gradient-border'];

      grid.innerHTML = data.articles.map(function(article, i) {
        var animClass = animClasses[i % animClasses.length];
        var date = new Date(article.publishedAt);
        var timeAgo = getTimeAgo(date);

        return '<article class="article-card live-card">' +
          '<a href="' + article.url + '" target="_blank" rel="noopener noreferrer">' +
            '<div class="article-card-image ' + animClass + '">' +
              '<img src="' + article.image + '" alt="' + article.title + '" loading="lazy" onerror="this.style.display=\'none\'">' +
              '<span class="article-card-category">Trending</span>' +
            '</div>' +
            '<div class="article-card-content">' +
              '<h3>' + article.title + '</h3>' +
              '<p>' + article.description + '</p>' +
              '<div class="article-card-meta">' +
                '<span class="meta-source"><i class="fas fa-newspaper"></i> ' + article.source + '</span>' +
                '<span class="meta-date"><i class="fas fa-clock"></i> ' + timeAgo + '</span>' +
              '</div>' +
            '</div>' +
          '</a>' +
        '</article>';
      }).join('');

    } catch (error) {
      grid.innerHTML = '<div class="live-loading"><i class="fas fa-newspaper"></i> Trending stories will appear here</div>';
    }
  }

  function getTimeAgo(date) {
    var now = new Date();
    var diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  loadLiveNews();

  // ===== Lazy load images =====
  if ('IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(function (img) {
      imgObserver.observe(img);
    });
  }

});
