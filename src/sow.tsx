import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import { chrImgChange } from './lib/teapot'
import { Welcome } from './lib/welcome'
import '../../giji/app/css/sow.css'

import '../../giji/app/models'
import '../../giji/app/models/_define'

Object.assign(window, { $, chrImgChange })
require('./lib/tooltip')

document.querySelector('h1#top')!.outerHTML = `<div id="top" />`

ReactDOM.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>,
  document.querySelector('#top')
)
