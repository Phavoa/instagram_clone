import "./HighLight.css";
import Image1 from "../../assets/images/highLights/image1.png";
import Image2 from "../../assets/images/highLights/image2.png";
import { useEffect, useState } from "react";
import { fetchFromApi } from "../../utils/fetchFromApi";
import PropTypes from "prop-types";

const defaultHighlights = [
  { highlight: Image1, title: "Templates" },
  { highlight: Image2, title: "Reviews" },
  { highlight: Image1, title: "Mentions" },
  { highlight: Image2, title: "Tips" },
  { highlight: Image1, title: "Blog" },
];

const HighLight = ({ userHighlight }) => {
  const [highlights, setHighlights] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: false });

  // console.log(highlights);

  useEffect(() => {
    const fetchUserHighlight = async () => {
      try {
        setStatus({ loading: true, error: false });
        const { data } = await fetchFromApi(
          `v1/highlights?username_or_id_or_url=${userHighlight}`
        );
        setHighlights(data.items || []);
      } catch (err) {
        console.error("Error fetching highlights:", err);
        setStatus({ loading: false, error: true });
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchUserHighlight();
  }, [userHighlight]);

  const renderHighlightItem = (highlight, index) => (
    <div className="highlight-item" key={index}>
      <div className="highlight-image">
        <img
          src={
            highlight.highlight || Image1
          }
          alt={highlight.title || "Highlight"}
          onError={(e) => (e.target.src = Image1)}
        />
      </div>
      <p className="highlight-title">{highlight.title || "No Title"}</p>
    </div>
  );

  if (status.loading)
    return <p className="status-message">Loading highlights...</p>;
  if (status.error)
    return <p className="status-message">Failed to load highlights.</p>;

  return (
    <div className="highlights-container">
      <div className="highlights">
        {(highlights.length > 0 ? highlights : defaultHighlights).map(
          renderHighlightItem
        )}
      </div>
    </div>
  );
};

HighLight.propTypes = {
  userHighlight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default HighLight;
