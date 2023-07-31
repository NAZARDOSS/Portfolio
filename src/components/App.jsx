import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main'
import Layout from '../Layout';
import SiteRoutes from '../SiteRoutes';
function App() {

  return (
    <Router>
     <Layout>
     <SiteRoutes />
     </Layout>
    </Router>
  );
}

export default App;
