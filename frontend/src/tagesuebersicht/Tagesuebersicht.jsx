import React from 'react';
import userStore from '../store';
import './tagesuebersicht.scss';
import Day from './Day';

export default function Tagesuebersicht() {
  const { getKalenderBemerkungen } = userStore();

  const bemerkungsArray = [];
  const weekdays = [0, 1, 2, 3, 4];

  getKalenderBemerkungen().then((response) => {
      bemerkungsArray.push(response)
  });

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
