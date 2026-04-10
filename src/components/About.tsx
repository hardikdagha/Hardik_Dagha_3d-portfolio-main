import { profile } from "../data/profile";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{profile.about}</p>
      </div>
      <div className="about-grid">
        {profile.aboutPanels.map((panel) => (
          <div className="about-panel" key={panel.label}>
            <span>{panel.label}</span>
            <p>{panel.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
