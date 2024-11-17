import { Component } from '@angular/core';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.css']
})
export class TncComponent {
  // Example dynamic table of contents generation
  generateToc(sections: HTMLElement[]) {
    const toc = document.getElementById('toc');
    if (!toc) return;

    sections.forEach((section) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${section.id}`;
      a.textContent = section.querySelector('h1, h2, h3')?.textContent || 'Section';
      li.appendChild(a);
      toc.appendChild(li);
    });
  }

  // Example dynamic progress bar
  updateProgressBar(progress: number) {
    const progressBar = document.getElementById('progress-bar') as HTMLElement;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  // Debounce helper function
  debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Example search functionality
  searchSections(searchTerm: string, sections: HTMLElement[]) {
    const regex = new RegExp(`.{0,50}${searchTerm}.{0,50}`, 'gi');
    const results = sections
      .filter((section) => section.textContent?.match(regex))
      .map((section) => {
        return `<div class="search-result">${section.textContent}</div>`;
      });

    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.innerHTML = results.join('');
    }
  }
}

