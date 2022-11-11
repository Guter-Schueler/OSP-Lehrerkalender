import React from 'react';
import './styles.scss';

const Dropdown = ({
      data,
      title,
      setState,
      selectedOption,
      customStyleClass,
      customButtonStyleClass,
      customListWrapClass,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onSelect = (value) => {
    setState(value);
    setOpen(!open);
  };

  return (
    <div className={customStyleClass || "dropdown"}>
      <button
          className={customButtonStyleClass || "osp-button"}
          onClick={handleOpen}
      >
        {title}
      </button>
      {open && (
        <ul className={customListWrapClass || "list-wrap"}>
          {data && data
            .filter((el) => (
                selectedOption ? el !== selectedOption : !''))
            .map((entry) => (
              <li key={entry.id} onClick={() => onSelect(entry)}>{entry.bezeichnung || entry}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
