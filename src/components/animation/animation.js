require('./animation.scss')
import React from 'react'
import classNames from 'classnames';

export default class animation extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let currentAnimation = $(this.refs.animation)
    let effectName = this.props.effect
    if (!this.props.show && nextProps.show) {
      currentAnimation.css('display','block').height()
      currentAnimation.addClass('in')

    } else if (this.props.show && !nextProps.show) {
      currentAnimation.removeClass('in')
      currentAnimation.one('webkitTransitionEnd',function(){
         currentAnimation.css('display','none')
      })
    }
  }


  render() {
    return (
      <div ref="animation" className={this.props.defaultClass+' simple-animation '+this.props.effect}>
        { this.props.children }
      </div>
    )
  }
}

animation.defaultProps = {
  show:false,
  defaultClass:'',
  effect:'fade'
}
