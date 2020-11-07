import React from "react"
import PropTypes from "prop-types"
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      user_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      user_name: event.target.user_name,
      email: event.target.email,
      password: event.target.password,
      password_confirmation: event.target.password_confirmation
    })
  }

  handleSubmit(event) {
    alert('A form is submitted: ');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="/users" accept-charset="UTF-8" method="post">
        <label>Name:
           <input className="form" type="text" name="user[name]" value={this.state.user_name} onChange={this.handleChange} />
        </label>

        <label for="user_email">Email:</label>
        <input className="form" type="email" name="user[email]" id="user_email" value={this.state.email} onChange={this.handleChange} />
        <label>password
          <input className="form" type="password" name="user[password]" value={this.state.password} onChange={this.handleChange} />
        </label>
        <label>password_confirmation
          <input className="form" type="password" name="user[password_confirmation]" value={this.state.password_confirmation} onChange={this.handleChange} />
        </label>

        <input className="form_submit" type="submit" name="submit" value="Submit" />
      </form>
    );
  }
}

export default Signup
