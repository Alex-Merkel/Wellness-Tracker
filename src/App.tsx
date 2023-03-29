import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Food from './pages/Food'
import './App.css'
import Journal from './pages/Journal'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Auth0Provider, withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import Profile from './authentication/Profile'


if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

// type AppProps = {};

const ProtectedRoute = ({ component, ...args }: any) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }: any) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};


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
        </Routes>
      </Auth0ProviderWithRedirectCallback>
    </HashRouter>
  )
}


export default App;
