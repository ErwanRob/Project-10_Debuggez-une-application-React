import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

/* const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  ); */

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  // eslint-disable-next-line
  console.log("Received imageSrc in Event CARD ++++++++:", imageSrc);
  // eslint-disable-next-line
  console.log("Received title in Event CARD ++++++++:", title);
  // eslint-disable-next-line
  console.log("Received date in Event CARD ++++++++:", date);

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};



// BUGSORT
EventCard.propTypes = {
/*   imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired, */
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  small: PropTypes.bool,
};

// BUGSORT
EventCard.defaultProps = {
  imageSrc: "Img did not load",
  title: "Img did not load",
  label: "Label did not load",
  imageAlt: "image",
  small: false,
}

export default EventCard;
