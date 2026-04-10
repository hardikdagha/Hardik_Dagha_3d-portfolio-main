import { PropsWithChildren } from "react";
import { profile } from "../data/profile";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{profile.hero.eyebrow}</h2>
            <h1>
              {profile.name.first.toUpperCase()}
              <br />
              <span>{profile.name.last.toUpperCase()}</span>
            </h1>
            <p className="landing-copy">{profile.hero.summary}</p>
            <div className="landing-highlights">
              {profile.hero.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>
          <div className="landing-info">
            <h3>{profile.hero.role}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{profile.hero.rotatingPrimary[0]}</div>
              <div className="landing-h2-2">{profile.hero.rotatingPrimary[1]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">
                {profile.hero.rotatingSecondary[0]}
              </div>
              <div className="landing-h2-info-1">
                {profile.hero.rotatingSecondary[1]}
              </div>
            </h2>
            <div className="landing-meta">
              <span>{profile.contact.location}</span>
              <a href={`mailto:${profile.contact.email}`} data-cursor="disable">
                {profile.contact.email}
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
