import React from 'react';

import NavigationBar from 'Components/Common';
import Remainders from 'Apps/Remainders';

function App() {
  return (
    <main className="w-screen h-screen h-vh80">
      <NavigationBar />
      {/* Routing could go here, since we just have one app it is not necessary. */}
      <Remainders />
    </main>
  );
}

export default App;
