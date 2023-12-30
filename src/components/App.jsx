import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main'
import Main2 from './Main2'
import Layout from '../Layout';
import LayoutIn from '../LayoutIn';
import SiteRoutes from '../SiteRoutes';
function App(props) {
  const [darkMode, setDarkMode] = useState(false); 
  return (
    <Router>
     {/* <Layout>
     <SiteRoutes />
     </Layout> */}
      <Routes>
          <Route element ={<Layout /> }>
            <Route path="/Portfolio/" element={<Main darkMode1 = {darkMode} setDarkMode1 = {setDarkMode}/>}/> 
            {/* <Route path="/nav" element={<ProfHide />} /> */}
          </Route>

          <Route element ={<LayoutIn /> }>
            <Route path="Portfolio/in" element={<Main2 darkMode = {darkMode} setDarkMode = {setDarkMode} />}/> 
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
