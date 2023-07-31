import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Resume from './components/SecondPage/Links/Resume';
import Projects from './components/SecondPage/Links/Projects';
import Main from './components/Main'
import ProfHide from './components/SecondPage/ProfHide';

function SiteRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/nav" element = {<ProfHide />} />
      </Routes>
      {/* <Route path="*" element={<NotFound />}></Route> */}
    </>
  );
}

export default SiteRoutes;
