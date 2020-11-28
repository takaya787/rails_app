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
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      value,
      selectedValue: value,
    });
    //console.log(value)
    this.props.parentscoreChange(value);
  }

  render() {
    const { value, selectedValue } = this.state;

    return (
      <section>
        <ReactStarsRating
          onChange={this.onChange}
          // isEdit={isEdit} isEditは結果を見せる時だけfalseにする
          value={value}
          selectedValue={selectedValue}
        />
      </section>
    )
  }
}
ReactStars.propTypes = {
  parentscoreChange: PropTypes.func,
  value: PropTypes.number,
};
export default ReactStars
