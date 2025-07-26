document.getElementById('trouble-link').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Feature being worked on.');
});

function goHome() {
  window.location.href = '/';
}

function refreshData() {
  fetchBoxes();
}

async function fetchBoxes() {
  try {
    const response = await fetch('/api/information'); 
    const data = await response.json();

    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear existing boxes

    data.forEach((row, index) => {
      const name = row.fields?.Name || `Item ${index + 1}`;

      const box = document.createElement('div');
      box.className = 'box';
      box.innerHTML = `
        <strong>${name}</strong><br/>
        <small>Row ID: ${row.row_id}</small>
      `;
      grid.appendChild(box);
    });
  } catch (err) {
    console.error('Error loading data:', err);
  }
}


// Load boxes on page load
document.addEventListener('DOMContentLoaded', fetchBoxes);

