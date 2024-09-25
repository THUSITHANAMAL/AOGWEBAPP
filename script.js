// Your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbwO3rFYvwpFVYywL3ToF1G1DJp-qii3q9uNa4h8sA6dxVtGdzoGEvKQJWLOxP01c4E8Ag/exec';  // Replace with your actual URL

// Function to get the sheet name from the URL
function getSheetNameFromURL() {
    const params = new URLSearchParams(window.location.search);  // Get URL parameters
    return params.get('sheet');  // Return the value of the 'sheet' parameter
}

// Function to fetch data from Google Sheets and display it
async function fetchData(sheetName) {
    try {
        // Fetch data from Google Apps Script based on the sheet name
        const response = await fetch(`${scriptURL}?sheetName=${sheetName}`);
        const data = await response.json();

        // Generate a table with the data
        let html = '<table border="1">';
        data.forEach(row => {
            html += '<tr>';
            for (let key in row) {
                html += `<td>${row[key]}</td>`; // Access cell data
            }
            html += '</tr>';
        });
        html += '</table>';

        // Display the data inside the 'sheetData' div
        document.getElementById('sheetData').innerHTML = html;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('sheetData').innerHTML = 'Error loading data';
    }
}

// Get the sheet name from the URL and fetch the data
const sheetName = getSheetNameFromURL();
fetchData(sheetName);
