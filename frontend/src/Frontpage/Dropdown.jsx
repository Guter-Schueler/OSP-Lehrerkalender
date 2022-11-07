import React from 'react';
import './styles.scss';

const Dropdown = ({ data, title, setState, selectedOption }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onSelect = (value) => {
    setState(value);
    setOpen(!open);
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
