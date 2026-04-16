const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const markdownPreview = document.getElementById('markdown-preview');
const downloadBtn = document.getElementById('download-btn');

let currentMarkdown = "";
let currentFilename = "converted_data.md";

// Click to upload
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

// Drag and Drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('active');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

// Process file
function handleFile(file) {
    // Save filename and replace extension with .md
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    currentFilename = `${baseName}.md`;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        let fullMarkdown = "";

        workbook.SheetNames.forEach((sheetName, index) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonData.length > 0) {
                if (workbook.SheetNames.length > 1) {
                    fullMarkdown += `### Sheet: ${sheetName}\n\n`;
                }
                fullMarkdown += convertToMarkdown(jsonData) + "\n\n";
            }
        });

        currentMarkdown = fullMarkdown.trim();
        markdownPreview.value = currentMarkdown;
        previewContainer.classList.remove('hidden');
        
        // Scroll to preview
        previewContainer.scrollIntoView({ behavior: 'smooth' });
    };
    reader.readAsArrayBuffer(file);
}

// Convert 2D array to Markdown table
function convertToMarkdown(data) {
    if (data.length === 0) return "";

    const headers = data[0];
    const rows = data.slice(1);

    // Format headers
    let markdown = "| " + headers.map(h => (h === null || h === undefined) ? "" : h).join(" | ") + " |\n";
    
    // Format separator
    markdown += "| " + headers.map(() => "---").join(" | ") + " |\n";

    // Format rows
    rows.forEach(row => {
        // Ensure the row has the same number of columns as the header
        const rowData = [];
        for (let i = 0; i < headers.length; i++) {
            const cell = row[i];
            rowData.push((cell === null || cell === undefined) ? "" : String(cell).replace(/\n/g, "<br>"));
        }
        markdown += "| " + rowData.join(" | ") + " |\n";
    });

    return markdown;
}

// Download
downloadBtn.addEventListener('click', () => {
    if (!currentMarkdown) return;

    const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
