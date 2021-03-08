import React from 'react';
import Modal from 'react-modal';

import NavigationBar from 'Components/Common';
import Reminders from 'Apps/Remainders';

Modal.setAppElement('#root');

function App() {
  return (
    <main className="w-screen h-screen h-vh80">
      <NavigationBar />
      {/* Routing could go here, since we just have one app it is not necessary. */}
      <Reminders />
    </main>
  );
}

export default App;
