document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const resetBtn = document.getElementById('resetSearchBtn');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const allTagsButton = document.querySelector('.tag-btn[data-value="all"]');
  const articles = document.querySelectorAll('.filterable');
  
  let currentTag = 'all';
  let searchQuery = '';

  function filterArticles() {
    articles.forEach(article => {
      // Splitter tagger om en post skulle ha flere enn én tag
      const tags = article.getAttribute('data-tags').split(' ');
      const title = article.querySelector('h2').textContent.toLowerCase();
      const content = article.querySelector('p').textContent.toLowerCase();
      
      const matchesTag = (currentTag === 'all' || tags.includes(currentTag));
      const matchesSearch = (title.includes(searchQuery) || content.includes(searchQuery));

      if (matchesTag && matchesSearch) {
        article.classList.remove('hidden');
      } else {
        article.classList.add('hidden');
      }
    });
  }

  // Søkefelt-event
  searchInput.addEventListener('input', function(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery.length > 0) {
      resetBtn.classList.remove('invisible');
    } else {
      resetBtn.classList.add('invisible');
    }
    filterArticles();
  });

  // Nullstill-knapp (Resetter nå også aktiv tag til "all")
  resetBtn.addEventListener('click', function() {
    searchInput.value = '';
    searchQuery = '';
    resetBtn.classList.add('invisible');
    
    // Klikker automatisk på "All paths"-knappen
    if (allTagsButton) {
      allTagsButton.click();
    } else {
      filterArticles();
    }
  });

  // Tag-knapper
  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      tagButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentTag = this.getAttribute('data-value');
      filterArticles();
    });
  });
});
