import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({ component, ...args }: any) => {
    const Component = withAuthenticationRequired(component, args);
    return <Component />;
  };
  
  export const Auth0ProviderWithRedirectCallback = ({ children, ...props }: any) => {
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