import React from 'react';
import QRCode from 'qrcode.react';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment/locale/pt';
import 'moment/locale/fr';
import 'moment/locale/es';
import 'moment/locale/de';
import { useScreenInfo } from '../../util/screen';
import './info.sass';
import reactionLike from '../../images/reaction-like.gif';
import reactionLove from '../../images/reaction-love.gif';
import reactionHaha from '../../images/reaction-haha.gif';
import reactionWow from '../../images/reaction-wow.gif';
import reactionSad from '../../images/reaction-sad.gif';
import reactionAngry from '../../images/reaction-angry.gif';
import FitText from '../fit-text/fit-text';


const reactionsMap = {
  like: reactionLike,
  love: reactionLove,
  haha: reactionHaha,
  wow: reactionWow,
  sad: reactionSad,
  angry: reactionAngry,
};

function Reaction({
  type,
  count,
}) {

  if (!count) return null;

  return (
    <span className="reaction">
      <img src={reactionsMap[type]} />
      <span className="count">{count}</span>
    </span>
  );
}

function Info({
  link = 'https://dsplay.tv',
  created = new Date().toDateString(),
  className = '',
  reactions: {
    like,
    love,
    wow,
    haha,
    sad,
    angry,
  } = {},
}) {
  moment.locale('en');
  const { locale, osVersion } = window.dsplay_config || window.config;

  const { w, h } = useScreenInfo();
  const smallDim = Math.min(w, h);
  const qrCodeBottomPadding = osVersion < 17 ? '1rem' : '0';

  if (locale) {
    moment.locale(locale);
  }

  const reactions = like || love || wow || haha || sad || angry;

  return (
    <div className={`info-container ${className}`}>
      <div className="info-box">
        {
          link &&
          <div className="qrcode-container" style={{ paddingBottom: qrCodeBottomPadding }}>
            <QRCode renderAs="svg" size="100%" ssize={15 * (smallDim / 100)} value={link} />
          </div>
        }
        <div className="info">
          <span className={`created-at ${reactions ? '' : 'no-reactions'}`}>
            <FitText>{moment(created).format('L')}</FitText>
          </span>
          <span className={`created-at ${reactions ? '' : 'no-reactions'}`}>
            <FitText>{moment(created).format('HH:mm:ss')}</FitText>
          </span>
          <span className="reactions">
            <Reaction type="like" count={like} />
            <Reaction type="love" count={love} />
            <Reaction type="haha" count={haha} />
            <Reaction type="wow" count={wow} />
            <Reaction type="sad" count={sad} />
            <Reaction type="angry" count={angry} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Info;