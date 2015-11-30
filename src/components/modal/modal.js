require('./modal.scss')
import React from 'react'
import classNames from 'classnames';
import Animation from '../animation/animation.js';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
    this.close = this.close.bind(this)
  }

  close(e) {
    console.log(this.props)
    if(this.props.maskClose){
      this.props.onClose();
    }
  }


  render() {
    return (
      <Animation defaultClass='modal' show={this.props.show} effect={this.props.effect}>
        <div className="modal-mask" onClick={ this.close }></div>
        <div className="modal-container">
          {this.props.children}
        </div>
      </Animation>
    )
  }
}

Modal.defaultProps = {
  maskClose:true,
  show:false,
  effect:'fadeIn',
  onClose:function(){}
}
