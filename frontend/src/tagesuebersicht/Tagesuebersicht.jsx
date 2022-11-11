import React from 'react';
import './tagesuebersicht.scss';
import Day from './Day';

export default function Tagesuebersicht() {
  const weekdays = [0, 1, 2, 3, 4];

  return (
    <div key={6} id="wochen-wrapper">
    {
        weekdays
            .map((i) =>
                <Day
                    key={i}
                    dayNum={i}
                    bemerkungen={['']}
                />
            )
    }
    </div>
  );
}
