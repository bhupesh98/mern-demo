export async function getItems() {
  try {
    const response = await fetch(`/api/items`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()).data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

export async function createItem(item) {
  try {
    const response = await fetch(`/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()).data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

export async function deleteItem(id) {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
}