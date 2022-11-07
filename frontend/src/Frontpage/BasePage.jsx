import React from 'react';
import './style.css';
import Dropdown from './Dropdown.js';

export default BasePage = () => {
  // TODO: folgende zwei const mit Daten aus der Datenbank ersetzen:
  const klassenDropdown = ['FI005', 'FI006', 'FI007', 'FI008', 'FI009'];
  const faecherDropdown = ['DEU', 'FEN', 'FU0', 'GiD', 'FU1'];

  const [selectedKlasse, selectKlasse] = React.useState('');
  const [selectedFach, selectFach] = React.useState('');

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

        <button className="datepicker">Datepicker</button>
      </div>

      <div className="content-page">
        <div key="left-side-dogus"></div>
        <div className="center-bar" />
        <div key="right-side-oli"></div>
      </div>
    </div>
  );
}
