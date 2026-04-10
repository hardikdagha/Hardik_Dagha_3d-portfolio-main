import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import { profile } from "../data/profile";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <a
        className="resume-button"
        href={profile.contact.resume}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
