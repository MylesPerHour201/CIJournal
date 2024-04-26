let journalEntries = [];
  
  function displayEntries(journalList) {
    if (!journalList) {
      journalList = document.getElementById('journal-entries');
    }
    journalList.innerHTML = '';
    journalEntries.forEach(entry => {
      const li = document.createElement('li');
      li.classList.add('entry');
      li.innerHTML = `
        <div class="title">${entry.title}</div>
        <div class="content">${entry.content}</div>
        <button onclick="editEntry(${entry.id})">Edit</button>
        <button onclick="deleteEntry(${entry.id})">Delete</button>
      `;
      journalList.appendChild(li);
    });
  }
  
  function addEntry(event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    if (title && content) {
      const newEntry = {
        id: Date.now(),
        title,
        content
      };
      journalEntries.push(newEntry);
      displayEntries();
      document.getElementById('journal-form').reset();
    } else {
      alert('Please fill in both title and content fields.');
    }
  }
  
  function deleteEntry(id) {
    journalEntries = journalEntries.filter(entry => entry.id !== id);
    displayEntries();
  }
  
  function editEntry(id) {
    const entry = journalEntries.find(entry => entry.id === id);
    if (entry) {
      const newTitle = prompt("Enter new title:", entry.title);
      const newContent = prompt("Enter new content:", entry.content);
      if (newTitle !== null && newContent !== null) {
        entry.title = newTitle.trim();
        entry.content = newContent.trim();
        displayEntries();
      }
    }
  }
  
  displayEntries();
  
  document.getElementById('journal-form').addEventListener('submit', addEntry);