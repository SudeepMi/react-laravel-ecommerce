import React, {Component} from 'react';
import RegisterContainer from './RegisterContainer';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "/dashboard",
    }
  }
  render() {
    return (
      <div className="content">
        <RegisterContainer redirect={this.state.redirect} />
      </div>
    )
  }
}
export default Register