document.addEventListener('DOMContentLoaded', function() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const baseUrl = isGitHubPages ? '/Studiejobb.se/' : '/';
    
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/Studiejobb.se/')) {
        link.setAttribute('href', isGitHubPages ? href : href.replace('/Studiejobb.se/', ''));
      } else if (href && !href.startsWith('http') && !href.startsWith('#')) {
        link.setAttribute('href', baseUrl + href);
      }
    });
  });