import { HashRouter, Routes, Route } from 'react-router-dom'
// import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Food from './pages/Food'
import Journal from './pages/Journal'
import Account from './pages/Account'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Auth0ProviderWithRedirectCallback, ProtectedRoute } from './authentication/AuthChecker'
import './App.css'


// if (process.env.NODE_ENV === 'production') {
//   disableReactDevTools();
// }

// type AppProps = {};


function App(): any {

  return (
    <HashRouter>
      <Auth0ProviderWithRedirectCallback
        domain="dev-rorjkfiimt8iqckg.us.auth0.com"
        clientId="Mu6n2InZgyAmJzTiN9ofS6630k3TfODW"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<ProtectedRoute component={Food} />} />
          <Route path="/journal" element={<ProtectedRoute component={Journal} />} />
          <Route path="/account" element={<ProtectedRoute component={Account} />} />
        </Routes>
      </Auth0ProviderWithRedirectCallback>
    </HashRouter>
  )
}


export default App;