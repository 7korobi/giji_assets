import '../../giji/app/css/sow.css'

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Query } from 'memory-orm'

import { chrImgChange } from './lib/teapot'
import { Welcome } from './lib/welcome'

import '../../giji/app/models'
import '../../giji/app/models/_define'

import { PlanApi, StoryApi } from './lib/fetch'

PlanApi()
StoryApi()

Object.assign(window, { $, chrImgChange, Query })
require('./lib/tooltip')

document.querySelector('h1#top')!.outerHTML = `<div id="top" />`

ReactDOM.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>,
  document.querySelector('#top')
)
