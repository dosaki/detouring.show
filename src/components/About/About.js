import './About.css';

import me from './me.jpg';

function About() {
  return (
    <div className="about-holder">
      <h2>How did you get to your current role?</h2>
      <p>Everyone has their own sinuous journey with a detour here and a diversion there until they end up where they are. Throughout my own career in technology, I've met many people who have interesting stories to tell about their professional path. I figured I'm probably not the only one who's interested in hearing them.</p>
      <p>In this podcast, I sit down with various people to find out how they navigated through their career and what impact the changes had on their lives.</p>
      <p>See you in the next <a className="dark" href="#episodes">episode</a>!</p>

      <h2>Who's the host?</h2>
      <div className="host-info">
        <div>
          <p>I'm Tiago! I did a bit of 3D art for opensource games before University and then converted into a software developer.</p>
          <p>You can find out more about me <a className="dark" href="https://about.dosaki.net/">here</a>.</p>
        </div>
        <img src={me} alt='Me playing on a N64' className="cut-image"></img>
      </div>
    </div>
  );
}

export default About;
