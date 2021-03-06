import React, { useMemo } from 'react';
import { useScreenInfo, screen } from '@dsplay/react-template-utils';

import './intro.sass';
import intro from '../../images/intro-small.gif';

// component

function Intro(props) {
  const { w, h, screenFormat } = useScreenInfo();

  const spinnerDimension = useMemo(() => {
    let dimension = Math.min(w, h) / 2;

    switch (screenFormat) {
      case screen.LANDSCAPE:
        break;
      case screen.PORTRAIT:
        break;
      case screen.SQUARE:
        break;
      case screen.H_BANNER:
      case screen.V_BANNER:
        dimension = Math.min(w, h) / 1;
        break;
      default:
        break;
    }

    return dimension;
  }, [w, h, screenFormat]);

  const imageStyle = {
    width: `${spinnerDimension}px`,
    height: `${spinnerDimension}px`,
  };

  const { className } = props;

  return (
    <div {...props} className={`loader ${className || ''}`}>
      <div>
        <img className="boun2ce-in-fwd" src={intro} alt="" style={imageStyle} />
      </div>
    </div>
  );
}

export default Intro;
