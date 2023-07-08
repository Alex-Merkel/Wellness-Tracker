import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Food from './pages/Food'
import Account from './pages/Account'
import { Auth0ProviderWithRedirectCallback, ProtectedRoute } from './authentication/AuthChecker'
import './App.css'


function App(): any {

  return (
    <HashRouter basename='/'>
      <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: "https://quiet-entremet-f8601f.netlify.app/account",
        }}
      >
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<ProtectedRoute component={Food} />} />
          <Route path="/account" element={<ProtectedRoute component={Account} />} />
        </Routes>
      </Auth0ProviderWithRedirectCallback>
    </HashRouter>
  )
}


export default App;