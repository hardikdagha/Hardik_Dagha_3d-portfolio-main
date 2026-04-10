import { MdArrowOutward } from "react-icons/md";

interface Props {
  title: string;
  label: string;
  highlights: string[];
  link?: string;
}

const WorkImage = (props: Props) => {
  const visual = (
    <>
      {props.link && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <div className="work-visual">
        <div className="work-visual-top">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="work-visual-body">
          <p>{props.label}</p>
          <h5>{props.title}</h5>
          <ul>
            {props.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
        >
          {visual}
        </a>
      ) : (
        <div className="work-image-in" data-cursor="disable">
          {visual}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
