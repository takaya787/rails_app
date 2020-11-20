import React from "react"
import PropTypes from "prop-types"
class Eachreview extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>reason = {this.props.reason}</li>
          <li>duration = {this.props.duration}ヶ月</li>
          <li>reason = {this.props.reason}</li>
          <li> spot = {this.props.address} </li>
        </ul>
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
  lon: PropTypes.number,
};
export default Eachreview
