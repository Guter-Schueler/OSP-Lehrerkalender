import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown.jsx';
import Tagesuebersicht from '../tagesuebersicht/tagesuebersicht';
import StudentTable from '../StudentTable/StudentTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import userStore from '../store';

export default function BasePage() {
  const {
    getKlassen,
    addKlassen,
    getFaecher,
    selectedDate,
    selectedFach,
    setFach,
    selectedKlasse,
    setKlasse,
    setSelectedDate,
    klassenArray,
    setKlassenArray,
    faecherArray,
    setFaecherArray,
    unitArray,
  } = userStore();

  React.useEffect(() => {
    getKlassen().then((res) => {
      addKlassen()
      const helper = [];
      res.map((el) => helper.push(el));
      setKlassenArray(helper);
    });
    getFaecher().then((res) => {
      const helper = [];
      res.map((el) => helper.push(el));
      setFaecherArray(helper);
    });
  }, [selectedFach, selectedKlasse]);

  const newFaecherArray = unitArray.length >= 1 && Array.from(unitArray.values());

  const newNewFaecherArray = [];
  newFaecherArray.length >= 1 && newFaecherArray.map((el) => newNewFaecherArray.push(el));

  return (
    <div className="base-page-wrapper">
      <div className="header-bar">
        <Dropdown
          key={'klassenDropdown'}
          data={klassenArray}
          title={selectedKlasse.bezeichnung || 'Klasse'}
          setState={setKlasse}
          selectedOption={selectedKlasse.bezeichnung}
        />

        <Dropdown
          key={'faecherDropdown'}
          data={newNewFaecherArray}
          title={selectedFach.bezeichnung || 'Fach'}
          setState={setFach}
          selectedOption={selectedFach.bezeichnung}
        />
        <div className="datepicker-position">
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="custom-date-picker-styles"
          />
        </div>
      </div>

      <div className="content-page">
        <div className="side-content-wrap">
          <Tagesuebersicht />
        </div>
        <div className="center-bar" />
        <div className="side-content-wrap">
          <StudentTable />
        </div>
      </div>
    </div>
  );
}
