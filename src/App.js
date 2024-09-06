import React from 'react';
import AppLayout from "./layouts";
import {BrowserRouter} from "react-router-dom";
import './index.css'
function App() {
  return (
    <>
      <React.StrictMode>
      <BrowserRouter>
        <AppLayout/>
      </BrowserRouter>
      </React.StrictMode>
    </>

  );
}

export default App;
