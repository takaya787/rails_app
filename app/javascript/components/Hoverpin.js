import React from "react"
import PropTypes from "prop-types"
import Reviewform from "./Reviewform.js"
import Hovertext from "./Hovertext.js"
const markerStyle = {
  height: 20,
  width: 20,
  backgroundColor: 'red',
  cursor: 'pointer'
};
const hoverStyle = {
  height: 20,
  width: 20,
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
    this.Menucontroll = this.Menucontroll.bind(this);
  }
  Formcontroll(event) {
    this.setState({
      isFormOpen: !this.state.isFormOpen,
      isMenuOpen: false,
    });
  }
  Menucontroll(event) {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      isFormOpen: false,
    })
  }
  render() {
    const style = this.props.$hover ? hoverStyle : markerStyle;
    return (
      <div>
        {/*click表示のreview-menuを表示*/}
        {this.state.isMenuOpen && (
          <div id="review_menu">
            <div className="menus">
              <button className="post" onClick={this.Formcontroll}>この場所に投稿</button>
              <button className="menu" onClick={this.props.MapGoup}>上に移動</button>
              <button className="menu" onClick={this.props.MapGoright}>右に移動</button>
              <button className="menu left" onClick={this.props.MapGoleft}>左に移動</button>
              <button className="menu down" onClick={this.props.MapGodown}>下に移動</button>
            </div>
          </div>
        )}
        {/*click表示のreview-formを表示*/}
        {this.state.isFormOpen && (
          <Reviewform
            url="/reviews"
            authenticityToken={this.props.authenticityToken}
            formClose={this.Formcontroll}
            lat={this.props.lat}
            lng={this.props.lng}
            parentFetchreviews={this.props.parentFetchreviews}
          />
        )}
        {/*ここまでreview-form*/}
        {/* hover-text start */}
        <div>
          {this.props.$hover && (
            <Hovertext />
          )}
        </div>
        {/* ここまで*/}
        <div className="marker" style={style} onClick={this.Menucontroll}>
        </div>
      </div>
    );
  }
}

Hoverpin.propTypes = {
  // GoogleMap pass $hover props to hovered components
  // to detect hover it uses internal mechanism, explained in x_distance_hover example
  $hover: PropTypes.bool,
  authenticityToken: PropTypes.string,
  //indexからreview情報を取得
  parentFetchreviews: PropTypes.func,
  //Mapのcenterを動かす
  MapGoup: PropTypes.func,
  MapGodown: PropTypes.func,
  MapGoright: PropTypes.func,
  MapGoleft: PropTypes.func,
};
export default Hoverpin
