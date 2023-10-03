import React, { useState, useEffect } from "react";
import "./NewDataFrom.css"; // Import the CSS for this component
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewDataForm() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null); // Add an error state variable
  const [loading, setLoading] = useState(false); // Add a loading state
  const navigate = useNavigate();

  const sendDataToBackend = async () => {
    try {
      setLoading(true); // Set loading to true while sending the request
      const response = await axios.post('https://billing-application.onrender.com/insert', { itemName, price });
      
      if (response.status === 201) {
        navigate('/datatable');
      } else {
        console.error('Server returned an unexpected status:', response.status);
      }
    } catch (error) {
      setLoading(false); // Set loading to false on error
      if (error.response) {
        console.error('Server error:', error.response.status, error.response.data);
  
        if (error.response.status === 400 && error.response.data.message === 'This item already exists in the database') {
          setError('Item with the same name already exists in the database. Please enter a new item.');
        } else {
          setError('An error occurred while processing your request. Please try again later.');
        }
      } else if (error.request) {
        console.error('No response received from the server');
        setError('An error occurred. No response received from the server.');
      } else {
        console.error('Error sending the request:', error.message);
        setError('An error occurred while sending the request.');
      }
    }
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="datacard">
      <center>
        <h1>New Item</h1>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="input-container">
            <input
              className="input-text"
              type="text"
              placeholder="Enter the Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              className="input-number"
              type="number"
              placeholder="Enter the Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={sendDataToBackend} className="btn">
              Add
            </button>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </center>
    </div>
  );
}

export default NewDataForm;
