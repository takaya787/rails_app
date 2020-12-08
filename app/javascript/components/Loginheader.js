import React from "react"
import PropTypes from "prop-types"
//react-iconsからダウンロード
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import './Header.scss'
class Loginheader extends React.Component {
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
  // handleSubmit(event) {
  //   console.log(this.event);
  //   event.preventDefault();
  // }
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
              <a href="/" className="link"><li className="link_part">Top</li></a>
              <a href="/reviews/new" className="link"><li className="link_part">Map</li></a>
              <a href={this.props.Yourpage} className="link"><li className="link_part">Your page</li></a>
              <a href="/beginner" className="link"><li className="link_part">How to use</li></a>
              {/* logoutのpost用 */}
              <li className="logout"><form acceptCharset="UTF-8" method="post" action={this.props.logout} >
                <input type="hidden" name="authenticity_token"
                  value={this.props.authenticityToken}
                />
                <button type="submit" name="logout" className="logout_part">Log out</button>
              </form></li>
            </ul>
          </div>
        )}
        { !this.state.isHeaderOpen && (
          < button className="header_opener" onClick={this.Menucontroll} >
            <AiOutlineMenu size={20} />
          </button >
        )}
      </div>
    );
  }
}
Loginheader.propTypes = {
  authenticityToken: PropTypes.string,
  logout: PropTypes.string,
  Yourpage: PropTypes.string,
};
export default Loginheader
