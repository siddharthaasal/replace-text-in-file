// text = text.replaceAll(/Cats/g,"Dogs");
// text = text.replaceAll(/cats/g,"dogs");

const  fileInput = document.getElementById('fileInput');
const textareaLeft = document.getElementById('textareaLeft');
const textareaRight = document.getElementById('textareaRight');
const clearButton = document.getElementById('clearButton');
const replaceButton = document.getElementById('replaceButton');
const findWordInput = document.getElementById('findWord');
const replaceWordInput = document.getElementById('replaceWord');
const downloadButton = document.getElementById('downloadButton');

// Add an event listener to the file input
fileInput.addEventListener('change', function () {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function (event) {
            // Read the file content as text
            const fileContent = event.target.result;

            // Set the left textarea's value to the file content
            textareaLeft.value = fileContent;
            modifiedText = fileContent;
        };

        reader.readAsText(selectedFile);
    } else {
        // Clear the left textarea if no file is selected
        textareaLeft.value = 'error';
        modifiedText = '';
    }

    clearButton.addEventListener('click', function () {
        // Clear the file input, left textarea, and find/replace inputs
        fileInput.value = '';
        textareaLeft.value = '';
        findWordInput.value = '';
        replaceWordInput.value = '';
        modifiedText = '';
    });

    replaceButton.addEventListener('click', function () {
        // Get the words to find and replace
        const findWord = findWordInput.value;
        const replaceWord = replaceWordInput.value;

        // Replace all occurrences of the findWord with replaceWord in the modified text
        modifiedText = modifiedText.replace(new RegExp(findWord, 'g'), replaceWord);

        // Set the right textarea's value to the modified text
        textareaRight.value = modifiedText;
    });
    downloadButton.addEventListener('click', function () {
        if (modifiedText) {
            // Create a Blob with the modified text
            const blob = new Blob([modifiedText], { type: 'text/plain' });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Create a download link and simulate a click to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'modified_text.txt';
            document.body.appendChild(a);
            a.click();

            // Cleanup: Revoke the temporary URL
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            alert('No modified text to download.');
        }
    });
});
