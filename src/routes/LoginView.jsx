import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, userExists } from '../firebase/firebase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthProvider } from '../components/AuthProvider'
import style from './LoginView.module.css';

const LoginView = () => {
  const navigate = useNavigate();
  // const [currenteUser, setCurrenteUser] = useState(null);
  // State: 0: inicializado, 1: loading, 2: login completo, 3: login pero sin registro, 4: no hay nadie logueado, 5: ya existe el username, 6: nuevo username, click para continuar, 7: username no existe
  const [state, setState] = useState(0);

  // useEffect(() => {
  //   setState(1);
  //   onAuthStateChanged(auth, async(user) => {
  //     if (user) {
  //       const isRegisterd = await userExists(user.uid);
  //       if (isRegisterd) {
  //         navigate('/dashboard');
  //         setState(2);
  //       } else {
  //         navigate('/choose-username');
  //         setState(3);
  //       }
  //       console.log(user.displayName);
  //     } else {
  //       setState(4);
  //       console.log('No hay nadie autenticado.');
  //     }
  //   });
  // }, [navigate]);

  const handleOnClick = async(e) => {
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async(googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
      } catch (error) {
        throw new Error(error);
      }
    }
    await signInWithGoogle(googleProvider);
  }

  const handleUserLoggedIn = user => {
    navigate('/dashboard');
  }

  const handleUserNotLoggedIn = () => {
    setState(4);
  }

  const handleUserNotRegistered = user => {
    navigate('/choose-username');
  }

  // if (state === 2) {
  //   return <div>Login completo</div>
  // }

  // if (state === 3) {
  //   return <div>Registrate</div>
  // }

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <div>
          <h1>Link Tree</h1>
        </div>
        <button className={style.provider} onClick={handleOnClick}>Login with Google</button>
      </div>
    )
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div>Loading...</div>
    </AuthProvider>
  )
}

export { LoginView };
