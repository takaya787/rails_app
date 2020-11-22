import React from "react"
import PropTypes from "prop-types"
//hoverpin.jsxの子コンポーネント
class Hovertext extends React.Component {
  render() {
    return (
      <div id="pop">
        <div className="text">
          <p>Clickでメニューを表示！</p>
        </div>
      </div>
    );
  }
}

export default Hovertext
