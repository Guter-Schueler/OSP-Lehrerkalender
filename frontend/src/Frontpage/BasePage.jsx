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
  } = userStore();

  React.useEffect(() => {
    getKlassen().then((res) => {
      const helper = [];
      res.map((el) => helper.push(el));
      setKlassenArray(helper);
    });
    getFaecher().then((res) => {
      const helper = [];
      res.map((el) => helper.push(el));
      setFaecherArray(helper);
    });
    console.log(selectedFach, selectedKlasse);
  }, [selectedFach, selectedKlasse]);

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
          data={faecherArray}
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
          <StudentTable klasse={selectedKlasse} fach={selectedFach} />
        </div>
      </div>
    </div>
  );
}
