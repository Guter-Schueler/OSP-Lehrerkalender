import React from 'react';
import userStore from '../store';
import './tagesuebersicht.scss';
import Day from './Day';

export default function Tagesuebersicht() {
  const { getKalenderBemerkungen } = userStore();

  const bemerkungsArray = [];

  getKalenderBemerkungen().then((response) => {
      bemerkungsArray.push(response)
  });

  return (
    <div id="wochen-wrapper">
    {
        Array(5)
            .fill(0)
            .map((_, i) =>
                <Day
                    key={i}
                    dayNum={i}
                    bemerkungen={bemerkungsArray}
                />
            )
    }
    </div>
  );
}
