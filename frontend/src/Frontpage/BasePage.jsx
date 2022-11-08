import React from 'react';
import './styles.scss';
import Dropdown from './Dropdown.jsx';
import Tagesuebersicht from '../tagesuebersicht/tagesuebersicht';
import StudentTable from '../StudentTable/StudentTable';
import userStore from '../store';

export default function BasePage() {
  // TODO: folgende zwei const mit Daten aus der Datenbank ersetzen:
  const klassenDropdown = ['FI005', 'FI006', 'FI007', 'FI008', 'FI009'];
  const faecherDropdown = ['DEU', 'FEN', 'FU0', 'GiD', 'FU1'];
  const { faecherArray } = userStore();

  const [selectedKlasse, selectKlasse] = React.useState('');
  const [selectedFach, selectFach] = React.useState('');
  console.log(faecherArray);

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
          data={faecherArray !== [] ? faecherArray : faecherDropdown}
          title={selectedFach || 'Fach'}
          setState={selectFach}
          selectedOption={selectedFach}
        />

        <button className="datepicker">Datepicker</button>
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
