document.getElementById("submitBtn").addEventListener("click", async function () {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const key = document.getElementById("submitBtn").dataset.key;

    const dataObj = {
        amount: amount,
        description: description,
        category: category
    };

    if (key) {
        // If key exists, update existing item
        try {
            await axios.put(`https://crudcrud.com/api/df2e69f64ba44a21bf15743f1cb333b9/expenseTracker/${key}`, dataObj);
        } catch (error) {
            console.error("Error updating data:", error);
        }
        document.getElementById("submitBtn").textContent = "Add Data";
        document.getElementById("submitBtn").removeAttribute("data-key");
    } else {
        // If key doesn't exist, create a new item
        try {
            await axios.post("https://crudcrud.com/api/df2e69f64ba44a21bf15743f1cb333b9/expenseTracker", dataObj);
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    displayLocalStorageData();
    clearInputFields();
});
async function displayDataFromApi() {
    try {
        const response = await axios.get("https://crudcrud.com/api/df2e69f64ba44a21bf15743f1cb333b9/expenseTracker");
        const data = response.data;
        const itemList = document.getElementById('items');
        itemList.innerHTML = ''; // Clear the existing list items
        itemList.addEventListener('click', handleItemClick);

        data.forEach(item => {
            var deleteBtn = document.createElement('button');
            var editBtn = document.createElement('button');
            const li = document.createElement('li');
            li.className = 'list-group-item';
            const combinedText = `${item.amount} ${item.description}-${item.category}`;
            li.appendChild(document.createTextNode(combinedText));
            deleteBtn.className = 'btn btn-danger btn-sm  delete';
            deleteBtn.dataset.key = item._id;
            deleteBtn.appendChild(document.createTextNode('Delete'));
            editBtn.className = 'btn btn-warning btn-sm  edit';
            editBtn.dataset.key = item._id;
            editBtn.appendChild(document.createTextNode('Edit'));
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            itemList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function handleItemClick(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this item?')) {
            const key = e.target.dataset.key;
            try {
                await axios.delete(`https://crudcrud.com/api/df2e69f64ba44a21bf15743f1cb333b9/expenseTracker/${key}`);
                const li = e.target.parentElement;
                li.remove();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    } else if (e.target.classList.contains('edit')) {
        const key = e.target.dataset.key;

        const response = await axios.get(`https://crudcrud.com/api/df2e69f64ba44a21bf15743f1cb333b9/expenseTracker/${key}`);
        const data = response.data;

        const li = e.target.parentElement;
        li.remove();
        document.getElementById("amount").value = data.amount;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("submitBtn").textContent = "Save";
        document.getElementById("submitBtn").dataset.key = key;
    }
}

// Call this function to display data when the page loads
displayDataFromApi();




function displayLocalStorageData() {
    const itemList = document.getElementById('items');
    itemList.innerHTML = ''; // Clear the existing list items
    itemList.addEventListener('click', handleItemClick);

    // Loop through localStorage and display the data
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));
        var deleteBtn = document.createElement('button');
        var editBtn = document.createElement('button');
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const combinedText = `${data.amount} ${data.description}-${data.category}`;
        li.appendChild(document.createTextNode(combinedText));
        deleteBtn.className = 'btn btn-danger btn-sm  delete';
        deleteBtn.dataset.key = key;
        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.className = 'btn btn-warning btn-sm  edit';
        editBtn.dataset.key = key;
        editBtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        itemList.appendChild(li);
    }
}

function handleItemClick(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this item?')) {
            const key = e.target.dataset.key;
            localStorage.removeItem(key);
            const li = e.target.parentElement;
            li.remove();
        }
    } else if (e.target.classList.contains('edit')) {
        const key = e.target.dataset.key;

        const data = JSON.parse(localStorage.getItem(key));
        localStorage.removeItem(key);
        const li = e.target.parentElement;
        li.remove();
        document.getElementById("amount").value = data.amount;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("submitBtn").textContent = "Save";

        document.getElementById("submitBtn").dataset.key = key;
    }
}

document.getElementById("submitBtn").addEventListener("click", function() {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const key = document.getElementById("submitBtn").dataset.key;

    if (key) {
        // If key exists, it means we are editing an existing item
        let myObj = {
            amount: amount,
            description: description,
            category: category

        };
        let myObj_serialized = JSON.stringify(myObj);
        localStorage.setItem(key, myObj_serialized);
        document.getElementById("submitBtn").textContent = "Add Data";
        document.getElementById("submitBtn").removeAttribute("data-key");
    } else {
        // If key doesn't exist, it means we are adding a new item
        const uniqueKey = Date.now().toString();
        let myObj = {
            amount: amount,
            description: description,
            category: category
        };
        let myObj_serialized = JSON.stringify(myObj);
        localStorage.setItem(uniqueKey, myObj_serialized);
    }

    displayLocalStorageData();
    clearInputFields();
});

function clearInputFields() {
    document.getElementById("amount").value = '';
    document.getElementById("description").value = '';
    document.getElementById("category").value = '';

}

displayLocalStorageData();
 
