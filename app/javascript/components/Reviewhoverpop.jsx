import React from "react"
import PropTypes from "prop-types"
//Eachreview.jsxの子コンポーネント
class Reviewhoverpop extends React.Component {
  render() {
    return (
      <div className="windowinfo">
        <div className="windowinfo_text">
          <p>滞在理由: {this.props.reason}</p>
          <p>住所: {this.props.address}</p>
          <p className="blue">そのままClick！</p>
        </div>
      </div>
    );
  }
}
Reviewhoverpop.propTypes = {
  reason: PropTypes.string,
  advice: PropTypes.string,
  address: PropTypes.string,
}
export default Reviewhoverpop
