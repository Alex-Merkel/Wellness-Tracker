import { useAuth0 } from "@auth0/auth0-react";

const Profile: any = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const email = user?.email

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      email
    )
  );
};

export default Profile;
