import React from "react"
import PropTypes from "prop-types"
// Reviewhover.jsxからimport
import Reviewhoverpop from './Reviewhoverpop.jsx'
class Eachreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isMenuOpen: false,
      isReviewOpen: false,
    };
    this.Reviewcontroll = this.Reviewcontroll.bind(this);
    //this.Menucontroll = this.Menucontroll.bind(this);
  }
  Reviewcontroll() {
    this.setState({
      isReviewOpen: !this.state.isReviewOpen,
      //isMenuOpen: false,
    });
  }
  /* menuを設置するなら追加
  Menucontroll() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      isReviewOpen: false,
    });
  }
  */
  render() {
    return (
      <div className="eachreview">
        {this.props.$hover && (
          <Reviewhoverpop
            reason={this.props.reason}
            advice={this.props.advice}
            address={this.props.address}
          />
        )}
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
  $hover: PropTypes.bool,
};
export default Eachreview
