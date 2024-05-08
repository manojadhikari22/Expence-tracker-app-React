import React, { useEffect } from 'react';
import styles from './ExpensesList.module.css';

const ExpensesList = ({ expenses, handleDelete, totalAmount }) => {
  
 
  return (
    <div className={styles.expenses}>
      <h2>Expenses</h2>
      <div className={styles.total_amount}>Total Amount: ${totalAmount.toFixed(2)}</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.title}</td>
              <td>${parseFloat(expense.amount).toFixed(2)}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category}</td>
              <td><button onClick={() => handleDelete(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default ExpensesList;