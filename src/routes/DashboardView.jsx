import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../components/AuthProvider";
import { DashboardWrapper } from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { deleteLink, getLinks, insertNewLink, updateLink } from "../firebase/firebase";
import { Link } from "../components/Link";
import style from './DashboardView.module.css';
import styleLinks from '../components/Link.module.css';

const DashboardView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = async(user) => {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }

  const handleUserNotLoggedIn = () => {
    navigate('/login');
  }

  const handleUserNotRegistered = user => {
    navigate('/login');
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        Loading...
      </AuthProvider>
    )
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
  }

  const addLink = () => {
    if (title !== '' && url !== '') {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      }
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle('');
      setUrl('');
      setLinks([...links, newLink]);
    }
  }

  const handleOnChange = (e) => {
    const value = e.target.value;

    if (e.target.name === 'title') {
      setTitle(value);
    }
    if (e.target.name === 'url') {
      setUrl(value);
    }
  }

  const handleDeleteLink = async(docId) => {
    await deleteLink(docId);
    const tmp = links.filter(link => link.docId !== docId);
    setLinks([...tmp]);
  }

  const handleUpdateLink = async(docId, title, url) => {
    const link = links.find(item => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  }

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>
        <form className={style.entryContainer} action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input className="input" type="text" name="title" onChange={handleOnChange} />
          <label htmlFor="url">Url</label>
          <input className="input" type="text" name="url" onChange={handleOnChange} />
          <input className="btn" type="submit" value="Create new link" />
        </form>
        <div className={styleLinks.linksContainer}>
          {links.map(link => (
            <Link
              key={link.docId}
              docId={link.docId}
              title={link.title}
              url={link.url}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  )
}

export { DashboardView };
