import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHashHistory } from 'history'
import App from './views/app/app.js'
import Index from './views/index/index.js'
import Edit from './views/edit/edit.js'

const history = createHashHistory()

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="edit/:license" component={Edit}/>
      <Route path="edit/:license/:regDate/:injured" component={Edit}/>
    </Route>
  </Router>
), document.getElementById('app-box'))