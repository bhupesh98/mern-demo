'use client';

export default function ItemList({ items, deleteItem }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-center text-gray-500">No items found. Add one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
        <h2 className="text-lg font-medium text-gray-900">Items List</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item._id} className="px-6 py-4 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              <p className="mt-1 text-xs text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteItem(item._id)}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}