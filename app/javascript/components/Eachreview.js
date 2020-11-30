import React from "react"
import PropTypes from "prop-types"
// Reviewhover.jsxからimport
import Reviewhoverpop from './Reviewhoverpop.js'

// Reviewfullcontent.jsxからimport
import Reviewfullcontent from './Reviewfullcontent.js'
//ReviewEditform.jsxからimport
import ReviewEditform from './ReviewEditform.js'
// react-responsive導入
import MediaQuery from "react-responsive"

class Eachreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isMenuOpen: false,
      isReviewOpen: false,
      isEditOpen: false,
    };
    this.Reviewcontroll = this.Reviewcontroll.bind(this);
    this.Editcontroll = this.Editcontroll.bind(this);
    //this.Menucontroll = this.Menucontroll.bind(this);
  }
  Reviewcontroll() {
    this.setState({
      isReviewOpen: !this.state.isReviewOpen,
      isEditOpen: false,
    });
  }
  Editcontroll() {
    this.setState({
      isEditOpen: !this.state.isEditOpen,
      isReviewOpen: false,
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
        {/* editをclick時にopen */}
        {this.state.isEditOpen && (
          <ReviewEditform
            id={this.props.id}
            reason={this.props.reason}
            duration={this.props.duration}
            food={this.props.food}
            convenient={this.props.convenient}
            favorite={this.props.favorite}
            score={this.props.score}
            advice={this.props.advice}
            authenticityToken={this.props.authenticityToken}
            parentFetchreviews={this.props.parentFetchreviews}
            Editcontroll={this.Editcontroll}
          />
        )}

        {/* click時に表示*/}
        {this.state.isReviewOpen && (
          <Reviewfullcontent
            reason={this.props.reason}
            duration={this.props.duration}
            food={this.props.food}
            convenient={this.props.convenient}
            favorite={this.props.favorite}
            score={this.props.score}
            advice={this.props.advice}
            address={this.props.address}
            Reviewcontroll={this.Reviewcontroll}
            //editボタン表示に使用
            Editcontroll={this.Editcontroll}
            User={this.props.User}
            currentUser={this.props.currentUser}
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
  //review内容
  id: PropTypes.number,
  reason: PropTypes.string,
  duration: PropTypes.number,
  food: PropTypes.string,
  convenient: PropTypes.string,
  favorite: PropTypes.string,
  score: PropTypes.number,
  advice: PropTypes.string,
  address: PropTypes.string,
  // user関連
  User: PropTypes.number,
  currentUser: PropTypes.number,
  //位置情報
  lat: PropTypes.number,
  lng: PropTypes.number,
  //関数その他
  $hover: PropTypes.bool,
  authenticityToken: PropTypes.string,
  parentFetchreviews: PropTypes.func,
};
export default Eachreview
