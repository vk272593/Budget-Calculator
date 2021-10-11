import React, { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "react-uuid";
const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "wifi", amount: 600 },
  { id: uuid(), charge: "car", amount: 300 },
];

function App() {
  //All expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense*****charge***
  const [charge, setCharge] = useState("");
  //single expense*****amount***
  const [amount, setAmount] = useState("");
  //alert
  const [alert,setAlert]=useState({show:false})
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
  const handleAlert=({type,text})=>{
    setAlert({show:true,type,text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }
  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const addedExpenses = { id: uuid(), charge, amount };
      setExpenses([...expenses, addedExpenses]);
      handleAlert({type:'success',text:'Item added'})
      setCharge("");
      setAmount("");
    } else {
     handleAlert({type:'danger',text:'Either charge or amount is empty or both are empty please add charge and amount'})
    }
  };

  return (
    <>
    {alert.show && <Alert type=
    {alert.type} text=
    {alert.text}/>}
      
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
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
