import React from "react"
import PropTypes from "prop-types"
class Eachreview extends React.Component {
  render() {
    return (
      <div className="eachreview" >
      </div>
    );
  }
}
Eachreview.propTypes = {
  reason: PropTypes.string,
  duration: PropTypes.number,
  good: PropTypes.string,
  bad: PropTypes.string,
  advice: PropTypes.string,
  address: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
};
export default Eachreview
