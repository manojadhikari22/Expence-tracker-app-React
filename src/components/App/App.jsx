import { useState, useEffect, useRef } from 'react';
import styles from './App.module.css'
import UserInputForm from '../UserInputForm/UserInputForm'
import ExpensesList from '../ExpensesList/ExpensesList'


function App() {
  // State to hold the list of expenses
  const [expenses, setExpenses] = useState([]);
  // State to hold the total amount of expenses
  const [totalAmount, setTotalAmount] = useState(0);
  // Ref to hold the previous expenses array
  const prevExpensesRef = useRef([]);
 
   // Function to add a new expense
   const addExpense = (newExpense) => {
     setExpenses([...expenses, newExpense]);
     setTotalAmount(totalAmount + parseFloat(newExpense.amount));
   };
 
   // Function to handle deleting an expense
   const handleDelete = (index) => {
     // Remove the expense from the list
     const deletedAmount = expenses[index].amount;
     setExpenses(expenses.filter((_, i) => i !== index));
    };
    // Update total amount whenever expenses change
  useEffect(() => {
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );
    setTotalAmount(totalAmount);
  }, [expenses]);

  // Update previous expenses ref after rendering
  useEffect(() => {
    prevExpensesRef.current = expenses;
  }, [expenses]);

  return (
    <div className={styles.main_container}>
      <div className={styles.user_input_container}>
        <UserInputForm addExpense={addExpense} />
      </div>
      <div className={styles.expenses}>
        <ExpensesList expenses={expenses} handleDelete={handleDelete} totalAmount={totalAmount} />
      </div>
    </div>
  )
}
export default App
