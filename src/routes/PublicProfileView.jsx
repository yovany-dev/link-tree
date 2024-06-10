import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { existsUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from "../firebase/firebase";
import { PublicLink } from '../components/PublicLink';
import style from './PublicProfileView.module.css';
import styleLinks from '../components/PublicLink.module.css';

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState('');
  const [state, setState] = useState(0);

  useEffect(() => {
    async function getProfile() {
      const username = params.username;

      try {
        const userUID = await existsUsername(username);

        if (userUID) {
          const userInfo = await getUserPublicProfileInfo(userUID);
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
          setUrl(url);
        } else {
          setState(7)
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    getProfile();
  }, [params]);

  if (state === 7) {
    return (
      <div>
        <h1>Username doesn't exist</h1>
      </div>
    )
  }

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="" />
      </div>
      <h2 className={style.title}>{profile?.profileInfo.username}</h2>
      <h3 className={style.title}>{profile?.profileInfo.displayName}</h3>
      <div className={styleLinks.publicLinksContainer}>
        {
          profile?.linksInfo.map(link => (
            <PublicLink key={link.id} url={link.url} title={link.title} />
          ))
        }
      </div>
    </div>
  )
}

export { PublicProfileView };
