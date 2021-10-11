import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

function ExpenseList({ expenses ,deleteItem,editItem,clearItems}) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return <ExpenseItem 
          key={expense.id} 
          expense={expense} 
          deleteItem={deleteItem}
          editItem={editItem}
          />;
        })}
      </ul>
      
      {expenses.length>0&&(<button className="btn" onClick={clearItems}>clear Item
      <MdDelete className="btn-icon"/>
      </button>)}
    </>
  );
}

export default ExpenseList;
