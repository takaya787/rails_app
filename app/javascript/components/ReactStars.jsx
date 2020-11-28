import React from "react"
import PropTypes from "prop-types"
//yarn add react-awesome-stars-rating
import ReactStarsRating from 'react-awesome-stars-rating'

class ReactStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      selectedValue: 0,
      isEdit: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      value,
      selectedValue: value,
    });
    //console.log(value)
    //propsで受け取ってなくてもerrorにならいために
    if (this.props.parentscoreChange) {
      this.props.parentscoreChange(value);
    }
  }
  componentDidMount() {
    //propsで指定したら初期値や変更の有無を変えれるようにする
    if (this.props.isEdit == false) {
      this.setState({
        isEdit: false,
      })
    }
    if (this.props.value) {
      this.setState({
        value: this.props.value,
        selectedValue: this.props.value,
      })
    }
  }
  render() {
    const { isEdit, value, selectedValue } = this.state;
    return (
      <section className="stars">
        <ReactStarsRating
          onChange={this.onChange}
          // isEdit={isEdit} isEditは結果を見せる時だけfalseにする
          isEdit={isEdit}
          value={value}
          selectedValue={selectedValue}
          size={this.props.size}
        />
      </section>
    )
  }
}
ReactStars.propTypes = {
  parentscoreChange: PropTypes.func,
  value: PropTypes.number,
  isEdit: PropTypes.bool,
  size: PropTypes.number,
};
export default ReactStars
