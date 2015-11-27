require('./modal.scss')
import React from 'react'
import classNames from 'classnames';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
    this.close = this.close.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let currentModal = $(this.refs.modal)
    let effectName = this.props.effect
    if (!this.props.show && nextProps.show) {
      currentModal.css('display','block').height()
      currentModal.addClass(effectName)

    } else if (this.props.show && !nextProps.show) {
      currentModal.removeClass(effectName)
      currentModal.one('webkitTransitionEnd',function(){
         currentModal.css('display','none')
      })
    }
  }

  close(e) {
    if(this.props.maskClose){
      this.props.onClose();
    }
  }


  render() {
    return (
      <div ref="modal" className='modal'>
        <div className="modal-mask" onClick={ this.close }></div>
        <div className="modal-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  maskClose:true,
  show:false,
  effect:'fadeIn',
  onClose:function(){}
}
