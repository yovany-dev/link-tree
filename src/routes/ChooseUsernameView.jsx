import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "../components/AuthProvider";
import { existsUsername, updateUser } from "../firebase/firebase";
import style from './ChooseUsernameView.module.css';

const ChooseUsernameView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState('');

  const handleUserLoggedIn = user => {
    navigate('/dashboard');
  }

  const handleUserNotLoggedIn = () => {
    navigate('/login');
  }

  const handleUserNotRegistered = user => {
    setCurrentUser(user);
    setState(3);
  }

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleContinue = async() => {
    if (username !== '') {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = {...currentUser};
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }

  if (state === 3 || state === 5) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {state === 5 ? <p>El nombre de usuario ya exite</p> : ''}
        <div>
          <input className="input" type="text" onChange={handleInputUsername} />
        </div>

        <div>
          <button className="btn" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    )
  }

  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Felicidades! ya puedes ir al dashboard a crear tus links</h1>
        <Link to={'/dashboard'}>Continuar</Link>
      </div>
    )
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
    </AuthProvider>
  )
}

export { ChooseUsernameView };
