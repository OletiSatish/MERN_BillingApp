import React, { useState, useEffect } from 'react';
import './DataTable.css';
import Loader from "../Common/Loder" // Import the Loader component
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function DataTable() {
  const [item, setItem] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [mongoData, setMongoData] = useState([]);
  const [selectedItemsData, setSelectedItemsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://billing-application.onrender.com/allitems')
      .then((response) => {
        if (Array.isArray(response.data.dataItems)) {
          setMongoData(response.data.dataItems);
        } else {
          setMongoData([]); // Set an empty array if dataItems is not an array
        }
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error('Error fetching MongoDB data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const addNewItem = () => {
    navigate('/newitem');
  };

  const handleChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setItem(userInput);

    // Check if mongoData is an array before filtering
    if (Array.isArray(mongoData)) {
      const filtered = mongoData.filter((dataItem) =>
        dataItem.itemName.toLowerCase().includes(userInput)
      );
      setFilteredItems(filtered);
    } else {
      // Handle the case when mongoData is not an array (e.g., empty or undefined)
      setFilteredItems([]);
    }
  };

  // Function to handle checkbox click
  const handleCheckboxClick = (itemId, itemName, price, quantity) => {
    setSelectedItemsData((prevSelectedItemsData) => {
      const itemIndex = prevSelectedItemsData.findIndex(
        (item) => item.itemId === itemId
      );
      if (itemIndex !== -1) {
        // If the item is already in the selected list, update its quantity
        prevSelectedItemsData[itemIndex].quantity = quantity;
      } else {
        // If the item is not in the selected list, add it with the entered quantity
        prevSelectedItemsData.push({ itemId, itemName, price, quantity });
      }
      return [...prevSelectedItemsData];
    });
  };

  const moveSelectedToBilling = () => {
    // Navigate to the Billing component with selected item data as part of the route state
    navigate('/billing', { state: { selectedItemsData } });
  };

  return (
    <div className="container">
      <div>
        <h1>TentHouse Materials</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Items"
          value={item}
          onChange={handleChange}
          className="inp-txt"
        />
        <button type="button" className="submit-button" onClick={addNewItem}>
          Add New Item
        </button>
      </div>
      <div className="table-container">
        {loading ? (
          <Loader /> // Display loader while loading
        ) : (
          <table border={1}>
            <thead>
              <tr>
                <th className="select-item">Select Item</th>
                <th>Item Name</th>
                <th>Price</th>
                <th className="no-of-items">No. of Items</th>
              </tr>
            </thead>
            <tbody>
              {(item === '' ? mongoData : filteredItems).map((item) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      name={`item-${item._id}`}
                      id={`item-${item._id}`}
                      onChange={() =>
                        handleCheckboxClick(item._id, item.itemName, item.price)
                      }
                      checked={selectedItemsData.some(
                        (selectedItem) => selectedItem.itemId === item._id
                      )}
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.price}</td>
                  <td className="no-of-items">
                    <input
                      type="number"
                      placeholder="Enter number of Item"
                      className="inp-number"
                      value={
                        selectedItemsData.find(
                          (itemData) => itemData.itemId === item._id
                        )?.quantity || ''
                      }
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value, 10);
                        handleCheckboxClick(
                          item._id,
                          item.itemName,
                          item.price,
                          quantity
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
              {item !== '' &&
                (filteredItems.length === 0 || !Array.isArray(mongoData)) && (
                  <tr>
                    <td colSpan="4">No items found</td>
                  </tr>
                )}
            </tbody>
          </table>
        )}
      </div>
      <br />
      <div>
        <button
          type="button"
          className="submit-button"
          onClick={moveSelectedToBilling}
        >
          Move Selected to Billing
        </button>
      </div>
    </div>
  );
}

export default DataTable;
