import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DueDatePicker = ({ dueDate, setDueDate }) => {
  return (
    <DatePicker
      selected={dueDate}
      onChange={date => setDueDate(date)}
      dateFormat="MM/dd/yyyy"
      placeholderText="Select due date"
      className="todo-datepicker mr2"
    />
  );
};

export default DueDatePicker;
