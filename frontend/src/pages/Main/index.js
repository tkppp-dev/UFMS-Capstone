import React from 'react';

// style
import { Background } from './style';

// component
import Inner from 'components/Main/Inner';
import PlaceContainer from 'components/Main/PlaceContainer';

function Main() {
  return (
    <div style={{ marginBottom: '64px' }}>
      <Background />
      <Inner />
      <PlaceContainer />
    </div>
  );
}

export default Main;
