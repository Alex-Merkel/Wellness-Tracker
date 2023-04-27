import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: any = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div onClick={() => loginWithRedirect()}>Log In / Sign Up</div>
        )
    )   
};

export default LoginButton;
