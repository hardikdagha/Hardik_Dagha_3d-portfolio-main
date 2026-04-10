import {
  MdArrowOutward,
  MdCopyright,
  MdDescription,
  MdMailOutline,
  MdPhone,
} from "react-icons/md";
import { profile } from "../data/profile";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn - {profile.contact.linkedinLabel}
              </a>
            </p>
            <p>
              <a href={`mailto:${profile.contact.email}`} data-cursor="disable">
                <MdMailOutline /> {profile.contact.email}
              </a>
            </p>
            <p>
              <a href={`tel:${profile.contact.tel}`} data-cursor="disable">
                <MdPhone /> {profile.contact.phone}
              </a>
            </p>
            <h4>Education</h4>
            {profile.education.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="contact-box">
            <h4>Credentials</h4>
            <a
              href={profile.contact.resume}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Resume <MdDescription />
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            {profile.certifications.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Security operations profile for <br />
              <span>
                {profile.name.first} {profile.name.last}
              </span>
            </h2>
            <p>{profile.availability}</p>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
