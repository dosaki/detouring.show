import './Tag.css';

function Tag(props) {
  const clickHandler = () => props.onClick(props.tag);
  return (
    <button className={`tag${props.isSelected ? ' selected' : ''}`} onClick={clickHandler}>
      <span className="small">#</span><span className="tag-name">{props.tag.toLowerCase()}</span>
    </button>
  );
}

export default Tag;
