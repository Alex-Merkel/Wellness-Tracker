import { useAuth0 } from "@auth0/auth0-react";


const LogoutButton: any = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
            </div>
        )
    )
};

export default LogoutButton;
