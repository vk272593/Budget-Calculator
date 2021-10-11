import React from "react";
import { MdSend } from "react-icons/md";

function ExpenseForm({
    charge,amount,handleCharge,handleAmount,handleSubmit,edit
}) {
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            className="form-control"
            type="text"
            name="charge"
            id="charge"
            placeholder="e.g.. egg"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            className="form-control"
            type="number"
            name="amount"
            id="amount"
            placeholder="e.g.. 100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button className="btn" type="submit">
        {edit?'Edit':'submit'}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
}

export default ExpenseForm;
