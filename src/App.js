import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "react-uuid";
// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "wifi", amount: 600 },
//   { id: uuid(), charge: "car", amount: 300 },
// ];
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  //All expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense*****charge***
  const [charge, setCharge] = useState("");
  //single expense*****amount***
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);
  //useEffect
  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  },[expenses]);
  //Functionalities
  //handlecharge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //handleamount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited" });
      } else {
        const addedExpenses = { id: uuid(), charge, amount };
        setExpenses([...expenses, addedExpenses]);
        handleAlert({ type: "success", text: "Item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "Either charge or amount is empty or both are empty please add charge and amount",
      });
    }
  };
  //clear all item
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Item Removed" });
  };
  //Delete single item
  const deleteItem = (id) => {
    const filterItem = expenses.filter((item) => {
      return item.id !== id;
    });
    setExpenses(filterItem);
    handleAlert({ type: "danger", text: "Item Removed" });
  };
  //Edit item
  const editItem = (id) => {
    const expense = expenses.find((item) => {
      return item.id === id;
    });
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          deleteItem={deleteItem}
          editItem={editItem}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ₹{" "}
          {expenses.reduce((acc, currItem) => {
            acc += parseInt(currItem.amount);
            return acc;
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
