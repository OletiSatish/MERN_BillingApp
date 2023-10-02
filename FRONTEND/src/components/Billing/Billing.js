import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Billing.css";

function Billing() {
  const location = useLocation();
  const { selectedItemsData } = location.state;
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  // Calculate the total price for each selected item
  const itemsWithTotalPrice = selectedItemsData.map((item, index) => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));

  // Calculate the Total Bill (sum of total prices)
  const totalBill = itemsWithTotalPrice.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <div>
            <h1>Billing</h1>
          </div>
          <div className="billing-container">
            <table>
              <thead>
                <tr>
                  <th>So.No</th>
                  <th>Item Name</th>
                  <th>No. of Items</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsWithTotalPrice.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-bill">
              <strong>Total Bill:</strong> {totalBill}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;
