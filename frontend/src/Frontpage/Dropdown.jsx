import React from 'react';
import './styles.scss';
import userStore from '../store';

const Dropdown = ({ data, title, setState, selectedOption }) => {
  const [open, setOpen] = React.useState(false);
  const { addFaecher } = userStore();

  const handleOpen = () => {
    setOpen(!open);
  };

  const onSelect = (value) => {
    setState(value);
    setOpen(!open);
    localStorage.setItem('Klasse', value);
    addFaecher();
  };

  return (
    <div className="dropdown">
      <button onClick={handleOpen}>{title}</button>
      {open && (
        <ul className="list-wrap">
          {data
            .filter((el) => (selectedOption ? el !== selectedOption : !''))
            .map((entry) => (
              <li onClick={() => onSelect(entry)}>{entry}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
