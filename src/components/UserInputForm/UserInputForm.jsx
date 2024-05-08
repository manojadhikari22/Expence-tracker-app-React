import React, { useState } from 'react'
import styles from './UserInputForm.module.css'

const UserInputForm = ({addExpense}) => {
    
    // State to hold the input values
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
    });

    // State to hold error messages
    const [errors, setErrors] = useState({
        titleError: '',
        amountError: '',
        dateError: '',
    });

    // FORM VALIDATION
    const userInputForm = ()=>{
        const clonedErrors = {...errors};
        let isVlaid = true;
        if (!formData.title.trim()) {
            clonedErrors.titleError = 'Title is required!';
            isVlaid = false;
          }else {
            clonedErrors.titleError = ''; // Reset error if title is filled
        }
          if (!formData.amount.trim()) {
            clonedErrors.amountError = 'Amount is required!';
            isVlaid = false;
          } else if (isNaN(formData.amount)) {
            clonedErrors.amountError = 'Amount must be a number!';
            isVlaid = false;
          }else {
            clonedErrors.amountError = ''; // Reset error if amount is filled and valid
        }
          if (!formData.date.trim()) {
            clonedErrors.dateError = 'Date is required!';
            isVlaid = false;
          } else {
            clonedErrors.dateError = ''; // Reset error if date is filled
        }
          setErrors(clonedErrors);
            return isVlaid;
      };

   
    const handleSubmit = (e) =>{
        e.preventDefault();
        //Checking form is valid
        const isValid = userInputForm();
        // if not return to the early
        if(!isValid){
            return;
        }
        addExpense(formData)
        // Perform actions like sending form data to parent or clearing form fields
        console.log('Form submitted:', formData);
        // Reset form data and errors
        setFormData({
          title: '',
          amount: '',
          date: '',
          category: '',
        });
    }

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev)=> ({...prev, [name]: value}))
        // Clear error message for the field being edited
        setErrors({ ...errors, [name]: '' });
        //setErrors((prevErrors) => ({ ...prevErrors, [`${name}Error`]: ""}))
    };

   return (
    <>
        <form className={styles.user_form_element} onSubmit={handleSubmit}>
            <fieldset className={styles.user_input_container}>
                <legend>Expense Tracker App</legend>
                <div className={styles.user_input_element}>
                    <label htmlFor="title">Title <sup>*</sup></label>
                    <input type="text" name='title' value={formData.title} onChange={handleChange}/>
                    <p className={styles.error}>{errors.titleError}</p>
                </div>
                <div className={styles.user_input_element}>
                    <label htmlFor="amount">Amount <sup>*</sup></label>
                    <input type="number" name='amount' value={formData.amount} onChange={handleChange}/>
                    <p className={styles.error}>{errors.amountError}</p>
                </div>
                <div className={styles.user_input_element}>
                    <label htmlFor="date">Date <sup>*</sup></label>
                    <input type="date" name='date' value={formData.date} onChange={handleChange}/>
                    <p className={styles.error}>{errors.dateError}</p>
                </div>
                <div className={styles.user_input_element}>
                    <label htmlFor=''>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="housing">Housing</option>
                        <option value="grocery">Grocery</option>
                        <option value="transportation">Transportation</option>
                        <option value="clothes">Clothes</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit" className={styles.submit_button}>Add Expense</button>
            </fieldset>
        </form>
        
      </>
  )
}

export default UserInputForm