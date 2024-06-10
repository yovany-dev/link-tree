import style from './PublicLink.module.css';

const PublicLink = ({ url, title }) => {
  return (
    <a className={style.publicLinkContainer} href={url}>
      <div>{title}</div>
    </a>
  )
}

export { PublicLink };
