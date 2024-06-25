// Initialize an array to store URLs
let urls = JSON.parse(localStorage.getItem('urls')) || [];

// Function to add a new URL
function addURL() {
  const siteNameInput = document.getElementById('siteNameInput');
  const urlInput = document.getElementById('urlInput');
  let siteName = siteNameInput.value.trim();
  let url = urlInput.value.trim();

  // Validate URL format
  if (!isValidURL(url)) {
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
    return;
  }

  urlInput.classList.remove('is-invalid');
  urlInput.classList.add('is-valid');

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }

  const newURL = {
    siteName: siteName,
    url: url
  };

  urls.push(newURL);
  localStorage.setItem('urls', JSON.stringify(urls));

  renderURLs();

  siteNameInput.value = '';
  urlInput.value = '';
  siteNameInput.classList.remove('is-valid');
  urlInput.classList.remove('is-valid');
}

function renderURLs() {
  const tableBody = document.getElementById('urlList');
  tableBody.innerHTML = ''; // Clear previous rows

  urls.forEach((url, index) => {
    const newRow = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1;

    const websiteNameCell = document.createElement('td');
    websiteNameCell.textContent = url.siteName;

    const visitCell = document.createElement('td');
    const visitLink = document.createElement('a');
    visitLink.href = url.url; // Set the URL directly
    visitLink.target = '_blank';
    visitLink.classList.add('btn', 'btn-primary', 'btn-sm');
    visitLink.innerHTML = '<i class="fas fa-eye"></i> Visit';
    visitCell.appendChild(visitLink);

    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    deleteBtn.onclick = function() {
      deleteURL(index);
    };
    deleteCell.appendChild(deleteBtn);

    newRow.appendChild(indexCell);
    newRow.appendChild(websiteNameCell);
    newRow.appendChild(visitCell);
    newRow.appendChild(deleteCell);
    tableBody.appendChild(newRow);
  });
}

function deleteURL(index) {
  urls.splice(index, 1); // Remove the URL from the array
  localStorage.setItem('urls', JSON.stringify(urls));
  renderURLs(); // Re-render the table
}

function isValidURL(url) {
  const pattern = /^((http|https):\/\/)?[a-z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?$/i;
  return pattern.test(url);
}

document.getElementById('siteNameInput').addEventListener('input', function() {
  const siteNameInput = this;
  if (siteNameInput.value.trim() === '') {
    siteNameInput.classList.remove('is-valid', 'is-invalid');
  } else {
    siteNameInput.classList.add('is-valid');
    siteNameInput.classList.remove('is-invalid');
  }
});

document.getElementById('urlInput').addEventListener('input', function() {
  const urlInput = this;
  if (!isValidURL(urlInput.value.trim())) {
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
  } else {
    urlInput.classList.remove('is-invalid');
    urlInput.classList.add('is-valid');
  }
});

// Initial rendering of URLs from local storage
renderURLs();
