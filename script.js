function loadExcelFile(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = new Uint8Array(xhr.response);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const songList = XLSX.utils.sheet_to_json(worksheet);

            const tbody = document.querySelector('#songTable tbody');
            tbody.innerHTML = '';
            songList.forEach(song => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${song.Title}</td>
                    <td>${song.Artist}</td>
                    <td>${song.Album}</td>
                    <td>${song.Type}</td>
                    <td><a href="${song.Link}" target="_blank">Click Here</a></td>
                `;
                tbody.appendChild(row);
            });
        }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
    loadExcelFile('files/index.xlsx'); // Adjust the path to your Excel file
});