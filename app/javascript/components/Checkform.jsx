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
    console.log(this.event.state);
    event.preventDefault();
    /*非同期処理は後回しで取り敢えず同期処理で行う
    fetch('http://127.0.0.1:3000/reviews/check', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: this.state.keyword,
        authenticityToken: this.props.authenticityToken,
      })
    }).then(function (response) {
      response.json(),
        console.log('request succeeded with JSON response', response)
    }).catch(function (error) {
      console.log('request faiiled', error)
    });
    this.props.parentMethod;
    */
  }

  render() {
    return (
      <div id="check">
        <form
          id="check_form"
          //parentMethodでmapを再fetchする
          onSubmit={this.handleSubmit}
          action={this.props.url} acceptCharset="UTF-8"
          method="post" dataremote="true"
        >
          <input type="hidden" name="authenticity_token"
            value={this.props.authenticityToken}
          />
          <input
            className="checkform" type="search" name="keyword" id="keyword" value={this.state.keyword} placeholder="場所を入力してください" onChange={this.handleChange}
          />
          <button className="form_submit" type="submit" name="submit"><GiMagnifyingGlass />
          </button>
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
