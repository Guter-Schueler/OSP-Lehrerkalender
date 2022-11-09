import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown.jsx';
import Tagesuebersicht from '../tagesuebersicht/tagesuebersicht';
import StudentTable from "../StudentTable/StudentTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BasePage() {
  const klassenDropdown = ['FI005', 'FI006', 'FI007', 'FI008', 'FI009'];
  const faecherDropdown = ['DEU', 'FEN', 'FU0', 'GiD', 'FU1'];

  const [selectedKlasse, selectKlasse] = React.useState('');
  const [selectedFach, selectFach] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());

  return (
    <div>
      <div className="header-bar">
        <Dropdown
          data={klassenDropdown}
          title={selectedKlasse || 'Klasse'}
          setState={selectKlasse}
          selectedOption={selectedKlasse}
        />

        <Dropdown
          data={faecherDropdown}
          title={selectedFach || 'Fach'}
          setState={selectFach}
          selectedOption={selectedFach}
        />
        <div className="datepicker-position">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
