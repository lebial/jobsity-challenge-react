import React from 'react';

import NavigationBar from 'Components/Common';
import Remainders from 'Apps/Remainders';

function App() {
  return (
    <>
      <NavigationBar />
      {/* Routing could go here, since we just have one app it is not necessary. */}
      <Remainders />
    </>
  );
}

export default App;
