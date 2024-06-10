import { AuthProvider } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase";

const SignoutView = () => {
  const navigate = useNavigate();

  const handleUserLoggedIn = async(user) => {
    await logout();
  }

  const handleUserNotLoggedIn = () => {
    navigate('/login');
  }

  const handleUserNotRegistered = user => {
    navigate('/login');
  }

  return(
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
    </AuthProvider>
  )
}

export { SignoutView };
