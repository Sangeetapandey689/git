const API_BASE_URL = 'https://crudcrud.com/api/6d3747256f3748cf8d44034e05f183f0/storeData/items'; 

async function fetchItems() {
  try {
    const response = await fetch(`https://crudcrud.com/api/6d3747256f3748cf8d44034e05f183f0/storeData/items`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

async function addItem(item) {
  try {
    const response = await fetch(`https://crudcrud.com/api/6d3747256f3748cf8d44034e05f183f0/storeData/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    return null;
  }
}

function displayItems(items) {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = '';

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <h3>${item.itemName}</h3>
      <p>Description: ${item.itemDescription}</p>
      <p>Price: $${item.itemPrice}</p>
      <p>Quantity: ${item.itemQuantity}</p>
    `;
    itemList.appendChild(itemDiv);
  });
}

document.getElementById('addItemForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const itemName = document.getElementById('itemName').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
  
  const newItem = {
    itemName,
    itemDescription,
    itemPrice,
    itemQuantity,
  };

  const addedItem = await addItem(newItem);
  if (addedItem) {
    const items = await fetchItems();
    displayItems(items);
  }
  
  // Clear form fields
  event.target.reset();
});

// Initial fetch and display of items
(async function() {
  const items = await fetchItems();
  displayItems(items);
})();
