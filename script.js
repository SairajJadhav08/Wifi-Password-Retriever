// --- Element Selectors ---
const fetchBtn = document.getElementById('fetch-btn');
const loader = document.getElementById('loader');
const statusDiv = document.getElementById('status');
const resultsContainer = document.getElementById('results-container');
const wifiTableBody = document.getElementById('wifi-table-body');
const saveTxtBtn = document.getElementById('save-txt');
const saveCsvBtn = document.getElementById('save-csv');
const saveJsonBtn = document.getElementById('save-json');

// --- State Management ---
// This variable will hold the data fetched from the server
let wifiDataStore = [];

// --- Event Listeners ---

// Main button to fetch data from the Python backend
fetchBtn.addEventListener('click', async () => {
    // 1. Reset the UI to a loading state
    setLoadingState(true);
    statusDiv.textContent = 'Fetching data from server... Please ensure wifi_server.py is running as an administrator.';
    resultsContainer.classList.add('hidden');
    wifiTableBody.innerHTML = '';

    try {
        // 2. Fetch data from the local Python Flask server's API endpoint
        const response = await fetch('http://127.0.0.1:5000/api/wifi-passwords');
        
        // Handle server-side errors (e.g., not running as admin)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        wifiDataStore = data; // Store the fetched data for later use (downloads)
        
        // 3. Display the data or a "not found" message
        if (data.length === 0) {
            statusDiv.textContent = 'No saved Wi-Fi profiles were found on this computer.';
        } else {
            displayDataInTable(data);
            statusDiv.textContent = `Successfully retrieved ${data.length} network(s).`;
            resultsContainer.classList.remove('hidden');
        }

    } catch (error) {
        // Handle network errors (e.g., server not running)
        console.error('Fetch error:', error);
        statusDiv.textContent = `Error: ${error.message}. Could not connect to the local server.`;
    } finally {
        // 4. Reset the UI from the loading state
        setLoadingState(false);
    }
});

// Add event listeners for each download button
saveTxtBtn.addEventListener('click', () => downloadFile('txt'));
saveCsvBtn.addEventListener('click', () => downloadFile('csv'));
saveJsonBtn.addEventListener('click', () => downloadFile('json'));

// --- Helper Functions ---

/**
 * Toggles the UI between loading and idle states.
 * @param {boolean} isLoading - True to show loader and disable button, false otherwise.
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        fetchBtn.disabled = true;
        fetchBtn.classList.add('btn-disabled');
        loader.classList.remove('hidden');
    } else {
        fetchBtn.disabled = false;
        fetchBtn.classList.remove('btn-disabled');
        loader.classList.add('hidden');
    }
}

/**
 * Populates the HTML table with the retrieved Wi-Fi data.
 * @param {Array<Object>} data - An array of network objects, each with an ssid and password.
 */
function displayDataInTable(data) {
    data.forEach(network => {
        const row = document.createElement('tr');
        
        // Use a more readable message for networks without a password
        const passwordCellContent = network.password 
            ? `<span class="font-mono p-1 bg-gray-200 rounded">${network.password}</span>`
            : '<span class="text-gray-400 italic">No Password / Open Network</span>';

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${network.ssid}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${passwordCellContent}</td>
        `;
        wifiTableBody.appendChild(row);
    });
}

/**
 * Generates and triggers the download of a file in the specified format.
 * @param {'txt' | 'csv' | 'json'} format - The desired file format.
 */
function downloadFile(format) {
    if (wifiDataStore.length === 0) {
        alert("No data to download. Please fetch passwords first.");
        return;
    }

    let content = '';
    let mimeType = '';
    let filename = `wifi_passwords.${format}`;

    // Generate file content based on the chosen format
    switch (format) {
        case 'txt':
            content = wifiDataStore.map(n => `SSID:     ${n.ssid}\nPassword: ${n.password}\n${'-'.repeat(20)}`).join('\n\n');
            mimeType = 'text/plain';
            break;
        case 'csv':
            const header = 'SSID,Password\n';
            const rows = wifiDataStore.map(n => `"${n.ssid.replace(/"/g, '""')}","${n.password.replace(/"/g, '""')}"`).join('\n');
            content = header + rows;
            mimeType = 'text/csv';
            break;
        case 'json':
            content = JSON.stringify(wifiDataStore, null, 4); // Pretty-print with 4-space indent
            mimeType = 'application/json';
            break;
    }

    // Create a Blob and trigger the download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up the temporary elements
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
