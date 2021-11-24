import './NavLink.css';

function NavLink(props) {
  return (
    <a href={`#${props.to}`} className={`${props.isSelected ? ' selected' : ''}`}>
      {props.children}
    </a>
  );
}

export default NavLink;
