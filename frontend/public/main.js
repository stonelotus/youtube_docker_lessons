document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    fetch('http://localhost:3000/api/items')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            displayData([{name: 'Error'}]);
        });
}

function displayData(data) {
    const container = document.getElementById('data-container');
    // Assuming data is an array of objects
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');
        div.id = 'data-container';
        div.innerHTML = `Item: ${item.name}`; // Modify depending on your data structure
        container.appendChild(div);
    });
}
