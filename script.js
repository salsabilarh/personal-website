(() => {
  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  ready(() => {
    // === Navbar toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
      menuIcon.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('active');

        // ubah ikon menu ↔ close
        menuIcon.classList.toggle('bx-x', isOpen);
        menuIcon.classList.toggle('bx-menu', !isOpen);
      });

      // tutup menu saat klik link
      navbar.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navbar.classList.remove('active');
          menuIcon.classList.remove('bx-x');
          menuIcon.classList.add('bx-menu');
        });
      });
    }

    // === Modal helpers (open/close)
    // Tetap global kalau dipanggil via onclick di HTML:
    window.openModal = (id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'block';
    };
    window.closeModal = (id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    };

    // Close modal saat klik overlay
    window.addEventListener('click', (event) => {
      document.querySelectorAll('.modal').forEach((modal) => {
        if (event.target === modal) modal.style.display = 'none';
      });
    });

    // Tabs Filtering (Projects)
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('#projects-grid .project-card');

    function showRole(role) {
  const grid = document.getElementById('projects-grid');
  let visibleCount = 0;

  cards.forEach((card) => {
    const match = card.getAttribute('data-role') === role;
    card.setAttribute('data-visible', match ? 'true' : 'false');
    if (match) visibleCount++;
  });

  // Aktifkan mode "single" jika hanya 1 kartu yang terlihat
  if (grid) {
    grid.classList.toggle('single', visibleCount === 1);
  }
}

    function setActiveTab(btn) {
      tabs.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }

    function initTabs(defaultRole = 'backend') {
      if (!tabs.length || !cards.length) return; // halaman tanpa tabs
      // Default role
      setActiveTab([...tabs].find((b) => b.dataset.role === defaultRole) || tabs[0]);
      showRole(defaultRole);
      // Sinkronisasi panel awal
      cards.forEach((c) => {
        const isVisible = c.getAttribute('data-role') === defaultRole;
        c.setAttribute('data-visible', isVisible ? 'true' : 'false');
      });

      // Event listeners
      tabs.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          setActiveTab(btn);
          showRole(btn.dataset.role);
        });

        // Aksesibilitas keyboard
        btn.addEventListener('keydown', (e) => {
          const key = e.key;
          let targetIndex = idx;
          if (key === 'ArrowRight') targetIndex = (idx + 1) % tabs.length;
          if (key === 'ArrowLeft')  targetIndex = (idx - 1 + tabs.length) % tabs.length;
          if (key === 'Home')       targetIndex = 0;
          if (key === 'End')        targetIndex = tabs.length - 1;
          if (targetIndex !== idx) {
            e.preventDefault();
            tabs[targetIndex].focus();
            tabs[targetIndex].click();
          }
        });
      });
    }

    // Default backend
    initTabs('backend');
  });
})();
