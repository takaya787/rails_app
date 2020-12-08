import React from "react"
import PropTypes from "prop-types"
import Signup from "./Signup.js"
//react-iconsからダウンロード
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderOpen: false,
    };
    this.Menucontroll = this.Menucontroll.bind(this);
  }
  Menucontroll(event) {
    this.setState({
      isHeaderOpen: !this.state.isHeaderOpen,
    });
  }
  render() {
    return (
      <div className="header">
        { /* clickでmenuを表示 */}
        {this.state.isHeaderOpen && (
          <div className="header_menu">
            < button className="header_menu_closer" onClick={this.Menucontroll} >
              <ImCross size={16} />
            </button >
            <ul className="header_menu_lists">
              <a href="/" className="link"><li className="link_part">Home</li></a>
              <a href="/beginner" className="link"><li className="link_part">How to use</li></a>
              <a href="/guest" className="link"><li className="link_part">Map for Guest</li></a>
              <li className="component">
                <Signup
                  signup={this.props.signup}
                  login={this.props.login}
                  authenticityToken={this.props.authenticityToken}
                  title="はじめる"
                />
              </li>
            </ul>
          </div>
        )}
        { !this.state.isHeaderOpen && (
          <button className="header_opener" onClick={this.Menucontroll} >
            <AiOutlineMenu size={20} />
          </button >
        )}
      </div>
    );
  }
}
Header.propTypes = {
  authenticityToken: PropTypes.string,
  signup: PropTypes.string,
  login: PropTypes.string,
};
export default Header
