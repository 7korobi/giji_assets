import React from 'react'
import ReactDOM from 'react-dom'
import { chrImgChange } from './lib/teapot'
import { Welcome } from './lib/welcome'
import './lib/welcome.css'

require('./models')
require('./lib/tooltip')

Object.assign(window, { chrImgChange })

ReactDOM.render(
  <React.StrictMode>
    <Welcome>
    </Welcome>
  </React.StrictMode>,
  document.querySelector('h1#top')
)