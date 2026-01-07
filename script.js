 const app = {
            snippets: [],
            editingId: null,
            currentView: 'all',
            currentLangFilter: 'all',
            
            init() {
                this.loadFromStorage();
                this.setupEventListeners();
                this.render();
                this.updateStats();
                this.renderLangChips();
            },
            
            loadFromStorage() {
                const stored = localStorage.getItem('devVaultSnippets');
                this.snippets = stored ? JSON.parse(stored) : this.generateEnhancedSampleData();
                this.saveToStorage();
            },
            
            saveToStorage() {
                localStorage.setItem('devVaultSnippets', JSON.stringify(this.snippets));
            },
            
            generateEnhancedSampleData() {
                const now = Date.now();
                return [
                    {
                        id: this.generateId(),
                        title: 'Debounce Function',
                        language: 'JavaScript',
                        code: `function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce((e) => {
  console.log('Searching:', e.target.value);
}, 300));`,
                        tags: ['performance', 'optimization', 'utility'],
                        createdAt: new Date(now - 86400000 * 5).toISOString(),
                        usageCount: 23,
                        favorite: true
                    },
                    {
                        id: this.generateId(),
                        title: 'Deep Clone Object',
                        language: 'JavaScript',
                        code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}`,
                        tags: ['object', 'clone', 'utility'],
                        createdAt: new Date(now - 86400000 * 3).toISOString(),
                        usageCount: 18,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'Async Retry Logic',
                        language: 'JavaScript',
                        code: `async function retryAsync(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      console.log(\`Retry attempt \${i + 2}/\${maxRetries}\`);
    }
  }
}

// Usage
const data = await retryAsync(() => fetch('/api/data').then(r => r.json()));`,
                        tags: ['async', 'error-handling', 'resilience'],
                        createdAt: new Date(now - 86400000 * 7).toISOString(),
                        usageCount: 31,
                        favorite: true
                    },
                    {
                        id: this.generateId(),
                        title: 'Local Storage Manager',
                        language: 'JavaScript',
                        code: `const storage = {
  set(key, value, ttl = null) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;
    
    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.remove(key);
      return null;
    }
    return item.value;
  },
  
  remove(key) {
    localStorage.removeItem(key);
  }
};`,
                        tags: ['storage', 'cache', 'utility'],
                        createdAt: new Date(now - 86400000 * 2).toISOString(),
                        usageCount: 15,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'Python Decorator Timer',
                        language: 'Python',
                        code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(2)
    return "Done!"`,
                        tags: ['decorator', 'performance', 'timing'],
                        createdAt: new Date(now - 86400000 * 10).toISOString(),
                        usageCount: 27,
                        favorite: true
                    },
                    {
                        id: this.generateId(),
                        title: 'List Comprehension Patterns',
                        language: 'Python',
                        code: `# Filter and transform
squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested comprehension
matrix = [[i*j for j in range(5)] for i in range(5)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}

# Set comprehension
unique_chars = {char.lower() for word in words for char in word}

# Conditional expression
result = [x if x > 0 else 0 for x in numbers]`,
                        tags: ['comprehension', 'functional', 'patterns'],
                        createdAt: new Date(now - 86400000 * 4).toISOString(),
                        usageCount: 19,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'Context Manager',
                        language: 'Python',
                        code: `from contextlib import contextmanager
import time

@contextmanager
def timer_context(name):
    start = time.time()
    print(f"Starting {name}...")
    try:
        yield
    finally:
        end = time.time()
        print(f"{name} completed in {end - start:.2f}s")

# Usage
with timer_context("Database Query"):
    # Your database operations here
    time.sleep(1)`,
                        tags: ['context-manager', 'resource-management', 'pattern'],
                        createdAt: new Date(now - 86400000 * 6).toISOString(),
                        usageCount: 12,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'TypeScript Generic Type Guard',
                        language: 'TypeScript',
                        code: `function isOfType<T>(
  obj: any,
  props: (keyof T)[]
): obj is T {
  return props.every(prop => prop in obj);
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Usage
if (isOfType<User>(data, ['id', 'name', 'email'])) {
  console.log(data.name); // TypeScript knows this is a User
}`,
                        tags: ['typescript', 'type-guard', 'generic'],
                        createdAt: new Date(now - 86400000 * 8).toISOString(),
                        usageCount: 21,
                        favorite: true
                    },
                    {
                        id: this.generateId(),
                        title: 'React Custom Hook - useDebounce',
                        language: 'TypeScript',
                        code: `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const searchTerm = useDebounce(inputValue, 500);`,
                        tags: ['react', 'hooks', 'debounce'],
                        createdAt: new Date(now - 86400000 * 1).toISOString(),
                        usageCount: 42,
                        favorite: true
                    },
                    {
                        id: this.generateId(),
                        title: 'SQL Window Functions',
                        language: 'SQL',
                        code: `-- Running total
SELECT 
  date, amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;

-- Rank within partition
SELECT 
  department, employee, salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;`,
                        tags: ['sql', 'window-functions', 'analytics'],
                        createdAt: new Date(now - 86400000 * 9).toISOString(),
                        usageCount: 14,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'Go Error Wrapping',
                        language: 'Go',
                        code: `package main

import (
    "fmt"
    "errors"
)

func processFile(filename string) error {
    data, err := readFile(filename)
    if err != nil {
        return fmt.Errorf("processFile: %w", err)
    }
    
    if err := validateData(data); err != nil {
        return fmt.Errorf("validation failed: %w", err)
    }
    
    return nil
}

// Check for specific error
if errors.Is(err, ErrNotFound) {
    // Handle not found
}`,
                        tags: ['go', 'error-handling', 'pattern'],
                        createdAt: new Date(now - 86400000 * 11).toISOString(),
                        usageCount: 8,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'Rust Result Pattern',
                        language: 'Rust',
                        code: `use std::fs::File;
use std::io::{self, Read};

fn read_file_contents(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Usage with match
match read_file_contents("data.txt") {
    Ok(contents) => println!("{}", contents),
    Err(e) => eprintln!("Error: {}", e),
}

// Usage with unwrap_or
let data = read_file_contents("data.txt").unwrap_or_default();`,
                        tags: ['rust', 'error-handling', 'result'],
                        createdAt: new Date(now - 86400000 * 12).toISOString(),
                        usageCount: 6,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'CSS Grid Responsive Layout',
                        language: 'CSS',
                        code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* Advanced grid areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
                        tags: ['css', 'grid', 'responsive'],
                        createdAt: new Date(now - 86400000 * 13).toISOString(),
                        usageCount: 25,
                        favorite: true
                    },
                    {
                        id: this.generateId(),
                        title: 'Flexbox Centering Patterns',
                        language: 'CSS',
                        code: `/* Perfect centering */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Space between items */
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive flex */
.responsive-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.responsive-flex > * {
  flex: 1 1 300px;
}`,
                        tags: ['css', 'flexbox', 'layout'],
                        createdAt: new Date(now - 86400000 * 14).toISOString(),
                        usageCount: 20,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'Java Stream Operations',
                        language: 'Java',
                        code: `import java.util.*;
import java.util.stream.*;

// Filter and map
List<String> names = people.stream()
    .filter(p -> p.getAge() > 18)
    .map(Person::getName)
    .collect(Collectors.toList());

// Group by
Map<String, List<Person>> byCity = people.stream()
    .collect(Collectors.groupingBy(Person::getCity));

// Reduce
int sum = numbers.stream()
    .reduce(0, Integer::sum);

// Parallel processing
long count = largeList.parallelStream()
    .filter(x -> x > 100)
    .count();`,
                        tags: ['java', 'streams', 'functional'],
                        createdAt: new Date(now - 86400000 * 15).toISOString(),
                        usageCount: 11,
                        favorite: false
                    },
                    {
                        id: this.generateId(),
                        title: 'PHP Modern Array Functions',
                        language: 'PHP',
                        code: `<?php
// Array filtering
$adults = array_filter($people, fn($p) => $p['age'] >= 18);

// Array mapping
$names = array_map(fn($p) => $p['name'], $people);

// Array reduce
$total = array_reduce($items, fn($carry, $item) => $carry + $item['price'], 0);

// Array column
$ids = array_column($users, 'id');

// Spread operator
$merged = [...$array1, ...$array2];

// Named arguments (PHP 8+)
function createUser(string $name, string $email, int $age) {
    // ...
}
createUser(name: 'John', email: 'john@example.com', age: 30);`,
                        tags: ['php', 'arrays', 'modern'],
                        createdAt: new Date(now - 86400000 * 16).toISOString(),
                        usageCount: 9,
                        favorite: false
                    }
                ];
            },
            
            generateId() {
                return Date.now().toString(36) + Math.random().toString(36).substr(2);
            },
            
            setupEventListeners() {
                document.getElementById('searchInput').addEventListener('input', (e) => {
                    this.searchSnippets(e.target.value);
                });
                
                document.getElementById('sortBy').addEventListener('change', (e) => {
                    this.sortSnippets(e.target.value);
                });
                
                document.getElementById('addModal').addEventListener('click', (e) => {
                    if (e.target.id === 'addModal') this.closeModal();
                });
            },
            
            switchView(view) {
                this.currentView = view;
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                event.target.classList.add('active');
                this.render();
            },
            
            renderLangChips() {
                const languages = ['all', ...new Set(this.snippets.map(s => s.language))];
                const container = document.getElementById('langChips');
                container.innerHTML = languages.map(lang => 
                    `<span class="lang-chip ${lang === this.currentLangFilter ? 'active' : ''}" 
                     onclick="app.filterByLanguage('${lang}')">${lang}</span>`
                ).join('');
            },
            
            filterByLanguage(lang) {
                this.currentLangFilter = lang;
                this.renderLangChips();
                this.render();
            },
            
            searchSnippets(query) {
                const filtered = this.snippets.filter(snippet => {
                    const searchText = `${snippet.title} ${snippet.code} ${snippet.tags.join(' ')}`.toLowerCase();
                    return searchText.includes(query.toLowerCase());
                });
                this.renderFiltered(filtered, query);
            },
            
            sortSnippets(method) {
                const sorted = [...this.snippets];
                switch(method) {
                    case 'name':
                        sorted.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    case 'language':
                        sorted.sort((a, b) => a.language.localeCompare(b.language));
                        break;
                    case 'usage':
                        sorted.sort((a, b) => b.usageCount - a.usageCount);
                        break;
                    default:
                        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }
                this.snippets = sorted;
                this.render();
            },
            
            render() {
                let filtered = [...this.snippets];
                
                // Apply view filter
                switch(this.currentView) {
                    case 'favorites':
                        filtered = filtered.filter(s => s.favorite);
                        break;
                    case 'recent':
                        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
                        break;
                    case 'popular':
                        filtered = filtered.sort((a, b) => b.usageCount - a.usageCount).slice(0, 10);
                        break;
                }
                
                // Apply language filter
                if (this.currentLangFilter !== 'all') {
                    filtered = filtered.filter(s => s.language === this.currentLangFilter);
                }
                
                this.renderFiltered(filtered);
            },
            
            renderFiltered(snippets, searchQuery = '') {
                const grid = document.getElementById('snippetGrid');
                
                if (snippets.length === 0) {
                    grid.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <div class="empty-state-text">No snippets found</div>
                            <button class="btn btn-primary" onclick="app.openAddModal()">Create Your First Snippet</button>
                        </div>
                    `;
                    return;
                }
                
                grid.innerHTML = snippets.map(snippet => {
                    let highlightedTitle = snippet.title;
                    let highlightedCode = snippet.code;
                    
                    if (searchQuery) {
                        const regex = new RegExp(`(${searchQuery})`, 'gi');
                        highlightedTitle = snippet.title.replace(regex, '<span class="search-highlight">$1</span>');
                        highlightedCode = snippet.code.replace(regex, '<span class="search-highlight">$1</span>');
                    }
                    
                    return `
                        <div class="snippet-card">
                            <div class="snippet-header">
                                <div class="snippet-title">${highlightedTitle}</div>
                                <div style="cursor: pointer; font-size: 20px;" onclick="app.toggleFavorite('${snippet.id}')">
                                    ${snippet.favorite ? '⭐' : '☆'}
                                </div>
                            </div>
                            <div class="snippet-badges">
                                <span class="badge badge-lang">${snippet.language}</span>
                                ${snippet.tags.map(tag => `<span class="badge badge-tag">${tag}</span>`).join('')}
                            </div>
                            <div class="snippet-code">${highlightedCode}</div>
                            <div class="snippet-meta">
                                <span>📅 ${new Date(snippet.createdAt).toLocaleDateString()}</span>
                                <span>🔥 ${snippet.usageCount} uses</span>
                            </div>
                            <div class="snippet-actions">
                                <button class="action-btn action-copy" onclick="app.copySnippet('${snippet.id}')">
                                    📋 Copy
                                </button>
                                <button class="action-btn action-edit" onclick="app.editSnippet('${snippet.id}')">
                                    ✏️ Edit
                                </button>
                                <button class="action-btn action-delete" onclick="app.deleteSnippet('${snippet.id}')">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            },
            
            updateStats() {
                const totalSnippets = this.snippets.length;
                const languages = new Set(this.snippets.map(s => s.language)).size;
                const totalUsage = this.snippets.reduce((sum, s) => sum + s.usageCount, 0);
                const favorites = this.snippets.filter(s => s.favorite).length;
                
                document.getElementById('stats').innerHTML = `
                    <div class="stat-card">
                        <div class="stat-value">${totalSnippets}</div>
                        <div class="stat-label">Total Snippets</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${languages}</div>
                        <div class="stat-label">Languages</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${totalUsage}</div>
                        <div class="stat-label">Total Usage</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${favorites}</div>
                        <div class="stat-label">Favorites</div>
                    </div>
                `;
            },
            
            toggleFavorite(id) {
                const snippet = this.snippets.find(s => s.id === id);
                if (snippet) {
                    snippet.favorite = !snippet.favorite;
                    this.saveToStorage();
                    this.render();
                    this.updateStats();
                    this.showToast(snippet.favorite ? '⭐ Added to favorites!' : '☆ Removed from favorites');
                }
            },
            
            openAddModal() {
                this.editingId = null;
                document.getElementById('modalTitle').textContent = 'Create New Snippet';
                document.getElementById('snippetTitle').value = '';
                document.getElementById('snippetLang').value = 'JavaScript';
                document.getElementById('snippetCode').value = '';
                document.getElementById('snippetTags').value = '';
                document.getElementById('addModal').style.display = 'flex';
            },
            
            closeModal() {
                document.getElementById('addModal').style.display = 'none';
            },
            
            saveSnippet() {
                const title = document.getElementById('snippetTitle').value.trim();
                const language = document.getElementById('snippetLang').value;
                const code = document.getElementById('snippetCode').value.trim();
                const tagsInput = document.getElementById('snippetTags').value.trim();
                
                if (!title || !code) {
                    this.showToast('Please fill in all required fields!', 'error');
                    return;
                }
                
                const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
                
                if (this.editingId) {
                    const index = this.snippets.findIndex(s => s.id === this.editingId);
                    this.snippets[index] = {
                        ...this.snippets[index],
                        title,
                        language,
                        code,
                        tags
                    };
                    this.showToast('✅ Snippet updated successfully!');
                } else {
                    this.snippets.unshift({
                        id: this.generateId(),
                        title,
                        language,
                        code,
                        tags,
                        createdAt: new Date().toISOString(),
                        usageCount: 0,
                        favorite: false
                    });
                    this.showToast('✅ Snippet added successfully!');
                }
                
                this.saveToStorage();
                this.render();
                this.updateStats();
                this.renderLangChips();
                this.closeModal();
            },
            
            editSnippet(id) {
                const snippet = this.snippets.find(s => s.id === id);
                if (!snippet) return;
                
                this.editingId = id;
                document.getElementById('modalTitle').textContent = 'Edit Snippet';
                document.getElementById('snippetTitle').value = snippet.title;
                document.getElementById('snippetLang').value = snippet.language;
                document.getElementById('snippetCode').value = snippet.code;
                document.getElementById('snippetTags').value = snippet.tags.join(', ');
                document.getElementById('addModal').style.display = 'flex';
            },
            
            copySnippet(id) {
                const snippet = this.snippets.find(s => s.id === id);
                if (!snippet) return;
                
                navigator.clipboard.writeText(snippet.code).then(() => {
                    snippet.usageCount++;
                    this.saveToStorage();
                    this.render();
                    this.updateStats();
                    this.showToast('📋 Code copied to clipboard!');
                }).catch(() => {
                    this.showToast('❌ Failed to copy code!', 'error');
                });
            },
            
            deleteSnippet(id) {
                if (!confirm('Are you sure you want to delete this snippet?')) return;
                
                this.snippets = this.snippets.filter(s => s.id !== id);
                this.saveToStorage();
                this.render();
                this.updateStats();
                this.renderLangChips();
                this.showToast('🗑️ Snippet deleted successfully!');
            },
            
            exportData() {
                const dataStr = JSON.stringify(this.snippets, null, 2);
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `devvault-snippets-${Date.now()}.json`;
                link.click();
                URL.revokeObjectURL(url);
                this.showToast('💾 Data exported successfully!');
            },
            
            importData() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'application/json';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const imported = JSON.parse(event.target.result);
                            if (Array.isArray(imported)) {
                                this.snippets = [...this.snippets, ...imported];
                                this.saveToStorage();
                                this.render();
                                this.updateStats();
                                this.renderLangChips();
                                this.showToast(`📂 Imported ${imported.length} snippets!`);
                            }
                        } catch (error) {
                            this.showToast('❌ Invalid file format!', 'error');
                        }
                    };
                    reader.readAsText(file);
                };
                input.click();
            },
            
            showToast(message, type = 'success') {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                if (type === 'error') {
                    toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                } else {
                    toast.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                }
                toast.style.display = 'block';
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 3000);
            }
        };
        
        document.addEventListener('DOMContentLoaded', () => app.init());