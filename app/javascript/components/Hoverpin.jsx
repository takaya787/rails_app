import React from "react"
import PropTypes from "prop-types"
import Reviewform from "./Reviewform.jsx"
const markerStyle = {
  height: 15,
  width: 15,
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
    this.state = {
      isMenuOpen: false,
      isFormOpen: false,
    };
    this.Formcontroll = this.Formcontroll.bind(this);
  }
  Formcontroll(event) {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
    });
  }

  render() {
    const style = this.props.$hover ? hoverStyle : markerStyle;
    if (this.state.isFormOpen) {
      return (
        <div>
          <div>
            <Reviewform
              url="/reviews"
              authenticityToken={this.props.authenticityToken}
              formclose={this.Formcontroll}
              lat={this.props.lat}
              lng={this.props.lng}
            />
          </div>
          <div className="marker" style={style} onClick={this.Formcontroll}>
          </div>
        </div>
      );
    } else {
      return (
        <div className="marker" style={style} onClick={this.Formcontroll}>
        </div>
      );
    };
  }
}
// latとlonの型宣言が抜けているので、後で直す
Hoverpin.propTypes = {
  // GoogleMap pass $hover props to hovered components
  // to detect hover it uses internal mechanism, explained in x_distance_hover example
  $hover: PropTypes.bool,
  authenticityToken: PropTypes.string,

  //$onMouseAllow: PropTypes.bool,
  //text: PropTypes.string
};
export default Hoverpin
