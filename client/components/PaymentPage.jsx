// PaymentForm.js

import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [depositId, setDepositId] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/payment/${depositId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <label>
          Deposit ID:
          <input
            type="text"
            value={depositId}
            onChange={(e) => setDepositId(e.target.value)}
          />
        </label>
      </form>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default PaymentForm;
