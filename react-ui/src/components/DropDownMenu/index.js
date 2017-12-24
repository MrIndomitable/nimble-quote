/**
*
* DropDownMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './dropdownmenu.css';
class DropDownMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { opened: false };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  onOpen() {
    this.setState({ opened: !this.state.opened });
  }
  onClick(func) {
    this.onOpen();
    this.props.onClick(func);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ opened: false });
    }
  }
  render() {
    return (
      <div className="dropdown-container" ref={this.setWrapperRef} tabIndex={0}>
        { this.props.children }
        {
          this.state.opened ? (
            <div className="dropdown">
              <ul>
                {
                  this.props.list.map((item, index) => {
                    return (
                      <li key={index} className="grey">
                        <div onClick={() => this.onClick(index)}>
                          {item}
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          ) : ('')
        }
      </div>
    );
  }
}

DropDownMenu.propTypes = {
 
};

export default DropDownMenu;
