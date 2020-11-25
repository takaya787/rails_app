import React from "react"
import PropTypes from "prop-types"
// Reviewhover.jsxからimport
import Reviewhoverpop from './Reviewhoverpop.jsx'

// Reviewfullcontent.jsxからimport
import Reviewfullcontent from './Reviewfullcontent.jsx'

// react-responsive導入
import MediaQuery from "react-responsive"

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
      <div>
        {/* click時に表示*/}
        {this.state.isReviewOpen && (
          <Reviewfullcontent
            reason={this.props.reason}
            duration={this.props.duration}
            good={this.props.good}
            bad={this.props.bad}
            advice={this.props.advice}
            address={this.props.address}
            Reviewcontroll={this.Reviewcontroll}
          />
        )}
        {/*タブレット端末ではhover表示は無しにする */}
        <MediaQuery query="(min-width: 768px)">
          {/* hover時に表示*/}
          {this.props.$hover && (
            <Reviewhoverpop
              reason={this.props.reason}
              advice={this.props.advice}
              address={this.props.address}
            />
          )}
        </MediaQuery>
        <div className="eachreview" onClick={this.Reviewcontroll}>
        </div>
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
