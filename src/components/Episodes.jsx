const Episode = ({ episode }) => { // Functional component Episode receiving props 'episode'
  return (
    <li className="episode-item"> {/* List item with class 'episode-item' */}
      <div className="episode-details"> {/* Container div for episode details */}
        <h4 className="episode-title">{episode.title}</h4> {/* Episode title */}
        <p className="episode-duration">Duration: {episode.duration}</p> {/* Episode duration */}
        {/* Implement favorite toggle button and functionality here */}
      </div>
    </li>
  );
};

export default Episode; // Exporting Episode component as default for use in other parts of the application
