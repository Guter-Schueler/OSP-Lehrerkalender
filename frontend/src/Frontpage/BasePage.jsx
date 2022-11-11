import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown.jsx';
import Tagesuebersicht from '../tagesuebersicht/tagesuebersicht';
import StudentTable from '../StudentTable/StudentTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import userStore from '../store';
import cookie from "js-cookie";

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
    setFaecherArray,
    unitArray,
    setShowBasePage,
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

  // unitArray ist trotz des namens ein objekt... deswegen muss erst ein array draus erzeugt werden
  const newFaecherArray =
      unitArray.length >= 1 && Array.from(unitArray.values()).map((el) => el);

  const resetFaecherAuswahl = () => {
    setFach('')
  }

  function logout() {
      setShowBasePage(false);
      cookie.remove('token');
      sessionStorage.removeItem('showBasePage');
  }

  return (
    <div className="base-page-wrapper">
      <div className="header-bar">
        <Dropdown
          key={'klassenDropdown'}
          data={klassenArray}
          title={selectedKlasse.bezeichnung || 'Klasse'}
          setState={setKlasse}
          selectedOption={selectedKlasse.bezeichnung}
          customOnSelect={resetFaecherAuswahl}
        />

        <Dropdown
          key={'faecherDropdown'}
          data={newFaecherArray}
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
        <div>
          <button className="osp-button" onClick={logout}>logout</button>
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
