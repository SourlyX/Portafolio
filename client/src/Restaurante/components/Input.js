import React, { Component } from "react";
import '../index.css'


class Input extends Component {
  render() {
    const {onChange, type, name, text, checked, className} = this.props
    return(
      <div className="input">
        <label>
          <input
            onChange={onChange}
            type={type}
            value={text}
            name={name}
            checked={checked}
            className={className}/>
          {text}
        </label>
      </div>
    )
  }
}

export default Input