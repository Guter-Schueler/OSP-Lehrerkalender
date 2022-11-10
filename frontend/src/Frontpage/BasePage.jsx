import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown.jsx';
import Tagesuebersicht from '../tagesuebersicht/tagesuebersicht';
import StudentTable from "../StudentTable/StudentTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userStore from "../store";

export default function BasePage() {
  const {
    getKlassen,
    getFaecher,
    selectedDate,
    setSelectedDate,
    klassenArray,
    setKlassenArray,
    faecherArray,
    setFaecherArray,
  } = userStore();

  React.useEffect(() => {
    getKlassen().then((res) => {
      const helper = [];
      for(let i=0; i<res.length; ++i) {
        helper.push(res[i].bezeichnung);
      }
      setKlassenArray(helper);
    },
    getFaecher().then((res) => {
      const helper = [];
      for(let i=0; i<res.length; ++i) {
        helper.push(res[i].bezeichnung);
      }
      setFaecherArray(helper);
    })
    )
  }, []);

  const [selectedKlasse, selectKlasse] = React.useState('');
  const [selectedFach, selectFach] = React.useState('');

  return (
    <div>
      <div className="header-bar">
        <Dropdown
          data={klassenArray}
          title={selectedKlasse || 'Klasse'}
          setState={selectKlasse}
          selectedOption={selectedKlasse}
        />

        <Dropdown
          data={faecherArray}
          title={selectedFach || 'Fach'}
          setState={selectFach}
          selectedOption={selectedFach}
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
