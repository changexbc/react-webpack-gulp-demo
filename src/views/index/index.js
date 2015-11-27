require('./index.scss')
import React from 'react'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import Modal from '../../components/modal/modal.js'
import classNames from 'classnames';
import moment from 'moment'
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.state = {
      car_info: [],
      showModal:false,
      showModal2:false,
      maskClose:true,
      noData:false
    }
  }

processData()  {
    var self = this
    $.ajax({
        type: "get",
        url: 'src/data/query.json',
        dataType: "json",
        success: function(resp) {
            resp = resp.data.list
            if (resp.length == 0) {
                self.state.noData = true
                return
            }
            var _nowTime = moment()

            function computedTime(_inspectionMinTime, _inspection_type, _injured, years) {
                var setReturnObj = function(timeType, timeStatus) {
                    var _diffTime = timeType.diff(_nowTime, 'months')
                    var _timeUnit = '个月'
                    if (_diffTime < 1) {
                        _diffTime = timeType.diff(_nowTime, 'days')
                            // alert(timeType)
                        var _timeUnit = '天'
                    }
                    return {
                        inspection_min_time: _inspectionMinTime.format("YYYY-MM-DD"),
                        inspection_max_time: _inspectionMaxTime.format("YYYY-MM-DD"),
                        diff_time: _diffTime,
                        time_unit: _timeUnit,
                        time_status: timeStatus,
                        inspection_type: _inspection_type
                    }
                }
                var minTime = _inspectionMinTime.clone()
                var _inspectionMaxTime = minTime.add(2, 'months').subtract(1, 'seconds')
                var _isBefore = _nowTime.isBefore(_inspectionMinTime)
                var _isBetween = _nowTime.isBetween(_inspectionMinTime, _inspectionMaxTime)

                if (!_inspection_type) {
                    var _after = _inspectionMaxTime.isAfter('2014-09-01')
                    if (_after && _injured == 'N' && years < 6) {
                        var _inspection_type = '免检验车'
                    } else {
                        var _inspection_type = '上线验车'
                    }
                }
                if (_isBefore) {
                    return setReturnObj(_inspectionMinTime, 'start')
                }
                if (_isBetween) {
                    return setReturnObj(_inspectionMaxTime, 'end')
                }
            }

            function _inspectionRule(diffTime, regTime, inspection_type, _injured) {
                regTime = regTime.subtract(1, 'month').startOf('months')
                if (diffTime < 6) {
                    for (var i = 2; i <= 6; i = i + 2) {

                        // 复制 _regTime
                        var _regTime = regTime.clone()
                        var _inspectionMinTime = _regTime.add(i, 'years')

                        // 复制 _inspectionMinTime
                        var _cloneMin = _inspectionMinTime.clone()
                        var _lastInspectionMinTime = _cloneMin.subtract(2, 'years')

                        // 复制 _lastInspectionMinTime
                        var _cloneLast = _lastInspectionMinTime.clone()
                        var _lastInspectionMaxTime = _cloneLast.add(2, 'months').subtract(1, 'seconds')


                        var _timeObj = computedTime(_inspectionMinTime, inspection_type, _injured, i)
                        if (_timeObj) {
                            _timeObj.last_inspection_min_time = _lastInspectionMinTime.format("YYYY-MM-DD")
                            _timeObj.last_inspection_max_time = _lastInspectionMaxTime.format("YYYY-MM-DD")
                            return _timeObj
                        }
                    }
                } else if (diffTime >= 6 && diffTime <= 15) {
                    if (diffTime <= 7) {
                        // 复制 _regTime
                        var _lastRegTime = regTime.clone()
                        var _lastInspectionMinTime = _lastRegTime.add(5, 'years')

                        // 复制 _inspectionMinTime
                        var _cloneLast = _lastInspectionMinTime.clone()
                        var _lastInspectionMaxTime = _cloneLast.add(2, 'months').subtract(1, 'seconds')
                    }
                    var _inspection_type = '上线验车'
                    for (var i = 0; i <= 9; i++) {
                        var _regTime = regTime.clone()
                        var _inspectionMinTime = _regTime.add(6 + i, 'years')

                        if (diffTime > 7) {
                            // 复制 _inspectionMinTime
                            var _cloneMin = _inspectionMinTime.clone()
                            var _lastInspectionMinTime = _cloneMin.subtract(1, 'years')

                            // 复制 _inspectionMinTime
                            var _cloneLast = _lastInspectionMinTime.clone()
                            var _lastInspectionMaxTime = _cloneLast.add(2, 'months').subtract(1, 'seconds')
                        }

                        var _timeObj = computedTime(_inspectionMinTime, _inspection_type)
                        if (_timeObj) {
                            _timeObj.last_inspection_min_time = _lastInspectionMinTime.format("YYYY-MM-DD")
                            _timeObj.last_inspection_max_time = _lastInspectionMaxTime.format("YYYY-MM-DD")
                            return _timeObj
                        }
                    }
                } else {
                    if (diffTime <= 16) {
                        // 复制 _regTime
                        var _lastRegTime = regTime.clone()
                        var _lastInspectionMinTime = _lastRegTime.add(14, 'years')

                        // 复制 _inspectionMinTime
                        var _cloneLast = _lastInspectionMinTime.clone()
                        var _lastInspectionMaxTime = _cloneLast.add(2, 'months').subtract(1, 'seconds')
                    }
                    var _inspection_type = '上线验车'
                    for (var i = 0;; i++) {
                        var _regTime = regTime.clone()
                        var _inspectionMinTime = _regTime.add(6 * (30 + i), 'months')

                        if (diffTime > 16) {
                            // 复制 _inspectionMinTime
                            var _cloneMin = _inspectionMinTime.clone()
                            var _lastInspectionMinTime = _cloneMin.subtract(6, 'months')

                            // 复制 _inspectionMinTime
                            var _cloneLast = _lastInspectionMinTime.clone()
                            var _lastInspectionMaxTime = _cloneLast.add(2, 'months').subtract(1, 'seconds')
                        }

                        var _timeObj = computedTime(_inspectionMinTime, _inspection_type)
                        if (_timeObj) {
                            _timeObj.last_inspection_min_time = _lastInspectionMinTime.format("YYYY-MM-DD")
                            _timeObj.last_inspection_max_time = _lastInspectionMaxTime.format("YYYY-MM-DD")
                            return _timeObj
                        }
                    }
                }
            }
            _.each(resp, function(value, key) {
                var _date = value.regDate
                if (!_date) {
                    return
                }
                var _injured = value.accident
                var _reg = moment(_date)
                var _after = _reg.isAfter('2014-09-01')
                var _diff = _nowTime.diff(_date, 'years')
                console.log('_date:' + _date + '   _injured:' + _injured + '   _reg:' + _reg + '   _after:' + _after + '   _diff:' + _diff)

                var _timeObject = _inspectionRule(_diff, _reg, value.inspection_type, _injured)
                    // console.log(_timeObject)
                if (_timeObject) {
                    value.inspection_min_time = _timeObject.inspection_min_time
                    value.inspection_max_time = _timeObject.inspection_max_time
                    value.last_inspection_min_time = _timeObject.last_inspection_min_time
                    value.last_inspection_max_time = _timeObject.last_inspection_max_time
                    value.diff_time = _timeObject.diff_time
                    value.time_unit = _timeObject.time_unit
                    value.time_status = _timeObject.time_status
                    value.inspection_type = _timeObject.inspection_type
                }
            })

            self.setState({
                car_info: resp
            })

        },
        error: function() {
            Daze.showMsg('请求失败！')
        }
    })

  }
  componentDidMount() {
    this.processData()
  }

  modalShow(){
    this.setState({
      showModal:true
    })
  }

  handleClose(){
    console.log(this)
    this.setState({
      showModal:false
    })
  }

  modalShow2(){
    this.setState({
      showModal2:true
    })
  }

  handleClose2(){
    console.log(this)
    this.setState({
      showModal2:false
    })
  }

  transformTime2Text(value) {
    if(value == 'start') return '距离下次年检开始还有'
    return '距离本次年检结束还剩'
  }

  transformTime2Status(value) {
    if(value == 'start') return '年检未开始'
    return '可办理年检'
  }

  render() {
    return (
      <div className="page-index page">
        <div className={classNames({'index-no-data': true,'hide': !this.state.noData})}>
          <span className="no-data-img"></span>
          <p>车库中空空如也～</p>
          <p className="index-tips">请在违章查询中添加车辆</p>
        </div>
      <div className={classNames({'index-content': true,'hide': this.state.noData})}>
        <div className="car">
          {this.state.car_info.map(car => {
            return (
              <div key = {car.vehicleNum}>
              <div className={classNames({'card': true,'hide': car.regDate})}>
                <Link className="card-item" to={`/edit/${car.vehicleNum}`}>
                  <h1 className="car-license">{car.vehicleNum}</h1>
                  <span className="car-complement">补全车辆信息</span>
                </Link>
                <section className="card-item">
                  <p className="car-info">年检信息无法获取</p>
                </section>
              </div>
              <div className={classNames({'card': true,'hide': !car.regDate,})}>
                <div className="card">
                  <Link className="card-item" to={`/edit/${car.vehicleNum}/${car.regDate}/${car.accident||'未选择'}`}>
                    <h1 className="car-license">{car.vehicleNum}</h1>
                    <span className="car-edit"></span>
                  </Link>
                  <section className="card-item">
                    <div className="car-inspection">
                      <div className="inspection-info">
                        <div className="inspection-info-inner">
                          <div className="inspection-days"><h1>{car.diff_time} <i>{car.time_unit}</i></h1></div>
                          <p className="inspection-text">{this.transformTime2Text(car.time_status)}</p>
                          <div className="inspection-status"><span>{this.transformTime2Status(car.time_status)}</span></div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="card inspection-time">
                  <div className={classNames({'hide': car.time_status != 'end'})}>
                    <section className="card-item">
                      <p>年检时间</p>
                      <p>{car.inspection_min_time} 到 {car.inspection_max_time}</p>
                    </section>
                    <section className="card-item" onClick={this.modalShow2.bind(this)}>
                      <p>年检方式</p>
                      <p className="inspection-type">{car.inspection_type}</p>
                    </section>
                    <section className="card-item inspection-help">
                      <span className="link">年检代办 VIP一对一服务</span>
                    </section>
                  </div>
                  <div className={classNames({'hide': car.time_status != 'start'})}>
                    <section className="card-item">
                      <p>上次年检</p>
                      <p>{car.last_inspection_min_time} 到 {car.last_inspection_max_time}</p>
                    </section>
                    <section className="card-item inspection-last">
                      <div className="inspection-last__item">
                        <p>下次年检</p>
                        <p>{car.inspection_min_time} 到 {car.inspection_max_time}</p>
                      </div>
                      <div className="inspection-last__item" onClick={this.modalShow.bind(this)}>
                        <p>年检方式</p>
                        <p className="inspection-type">{car.inspection_type}</p>
                      </div>
                    </section>
                    <section className={classNames({
                      'card-item':true,
                      'inspection-help':true,
                      'hide':car.time_status != 'end'
                    })}>
                      <span className="link">年检代办 VIP一对一服务</span>
                    </section>
                  </div>
                </div>
              </div>
              </div>
            )}
          )}


        </div>
      </div>

      <Modal title="第一个 Modal"
        effect="fadeIn"
        show={this.state.showModal}
        onClose={this.handleClose.bind(this)}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </Modal>

      <Modal title="第一个 Modal"
        effect="fadeIn"
        show={this.state.showModal2}
        onClose={this.handleClose2.bind(this)}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </Modal>
      </div>

    )
  }
}

