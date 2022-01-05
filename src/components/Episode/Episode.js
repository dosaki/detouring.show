import './Episode.css';
import './EpisodeCutVariations.css';
import random from '../../utils/randomUtils';

function Episode(props) {
  const style = {
    backgroundImage: `url(${props.info.image})`
  };
  const variation = props.variation || random.pick(..."abcde".split(""));
  return (
    <div className={`episode ${variation}`}>
      <div style={style} className="image-area">
        <div className="info-area">
          <div className="info-title">
            {props.info.date.toLocaleDateString()}
            <h3>{props.info.title}</h3>
          </div>
          <audio controls className="player">
            <source src={props.info.audioFile} />
          </audio>
          <div className="summary" dangerouslySetInnerHTML={{ __html: props.info.description }} />
        </div>
      </div>
    </div>
  );
}

// {
//   title: removeCDATA(episode.querySelector("title").innerHTML),
//   description,
//   link: episode.querySelector("link").innerHTML,
//   author: removeCDATA(episode.querySelector("creator").innerHTML),
//   date: new Date(episode.querySelector("pubDate").innerHTML),
//   audioFile: episode.querySelector("enclosure").getAttribute("url"),
//   duration: episode.querySelector("duration").innerHTML,
//   image: episode.querySelector("image").innerHTML,
//   isExplicit: episode.querySelector("explicit").innerHTML.toLowerCase() === "no",
//   tags: extractTags(description)
// }

export default Episode;
