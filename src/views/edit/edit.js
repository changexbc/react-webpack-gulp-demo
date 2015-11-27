require('./edit.scss')
import React from 'react'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.state = {
      regDate: '未选择',
      injured: '未选择',
      injuredOption: [{
          text: '未选择',
          value: '未选择'
      }, {
          text: '没有发生过',
          value: '没有发生过'
      }, {
          text: '发生过',
          value: '发生过'
      }],
      showModal:false,
      maskClose:true
    }
  }

  componentDidMount() {
    // this.processData()
  }

  goToIndex() {
    this.props.history.pushState(null, '/')
  }

  render() {



    return (
      <div className="page-car-edit page">
        <div className={this.props.params.regDate ? 'card show' : 'hide'}>
          <section className="card-item" onClick = {this.goToIndex.bind(this)}>
            <p>车牌号</p>
            <div className="edit-license">{this.props.params.license}</div>
          </section>
        </div>
        <div className="card">
          <section className="card-item">
            <p className="edit-regdate" >车辆注册日期</p>
            <div className="picker-wrap">
            </div>
          </section>
          <section className="card-item">
            <p>伤亡事故</p>
            <div className="picker-wrap">
              <select>
                <option>

                </option>
              </select>
            </div>
          </section>
        </div>

        <div className="edit-save">
          <a>
            <span className={this.props.params.regDate ? '' : 'hide'}>开始查询</span>
            <span className={!this.props.params.regDate ? '' : 'hide'}>保存</span>
          </a>
        </div>


      </div>
    )
  }
}
