import React, { Component } from "react";

class Button extends Component {
  render(){
    return(
      <button className="button" {...this.props} />
    )
  }
}

export default Button