import React from "react"
import PropTypes from "prop-types"

const markerStyle = {
  height: 20,
  width: 20,
  backgroundColor: 'red',
  cursor: 'pointer'
};
const hoverStyle = {
  height: 15,
  width: 15,
  backgroundColor: 'blue',
  cursor: 'pointer',
};
class Hoverpin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.$hover ? hoverStyle : markerStyle;

    return (
      <div className="marker" style={style}>
      </div>
    );
  }
}
Hoverpin.propTypes = {
  // GoogleMap pass $hover props to hovered components
  // to detect hover it uses internal mechanism, explained in x_distance_hover example
  $hover: PropTypes.bool,
  $onMouseAllow: PropTypes.bool,
  //text: PropTypes.string
};
export default Hoverpin
