import React from "react"
import PropTypes from "prop-types"

//react-iconsをダウンロード
import { SiGooglemaps } from 'react-icons/si';
import { GiMagnifyingGlass } from 'react-icons/gi';
class Checkform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    // console.log()を通して、initial statueを行いformの値が送信されている
    console.log(this.state);
    event.preventDefault();
    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: this.state.keyword,
        authenticityToken: this.props.authenticityToken,
      })
    }).then(
      //checkformからcenterが変更されたらcenterを更新する
      this.props.parentMethod
    )
  }

  render() {
    return (
      <div id="check">
        <form
          id="check_form"
          //parentMethodでmapを再fetchする
          onSubmit={this.handleSubmit}
          action={this.props.url} acceptCharset="UTF-8"
          method="post" data-remote="true"
        >
          <div className="check">
            <input type="hidden" name="authenticity_token"
              value={this.props.authenticityToken}
            />
            <div className="check_icon">
              <SiGooglemaps size={16} />
            </div>
            <input
              className="check_form" type="search" name="keyword" id="keyword" value={this.state.keyword} placeholder="場所を入力してください" onChange={this.handleChange}
            />
            <button className="check_submit" type="submit" name="submit"><GiMagnifyingGlass size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Checkform.propTypes = {
  url: PropTypes.string,
  authenticityToken: PropTypes.string,
  parentMethod: PropTypes.func,
};

export default Checkform
