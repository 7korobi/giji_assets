import React, { useEffect } from 'react'
import { useLocalStorage } from 'react-petit-hooks/lib/storage'
import { Btn } from './btn'

const cssRegexp = /css=(ririnra|cinema|night|star|wa)(480|800|)/

const [defaultCSS, defaultTheme, defaultSize] = location.search.match(cssRegexp) || []

const body = document.body
const link_css: HTMLLinkElement = document.querySelector('[title][rel=stylesheet]') as any

type SOW_CSS = [
  'ririnra' | 'cinema' | 'night' | 'star' | 'wa',
  '' | '480' | '800',
]

export function BtnsSow() {
  let [[theme, size], setCss] = useLocalStorage<SOW_CSS>('css', ['cinema','800'])
  const stateSize: [SOW_CSS[1],typeof setSize] = [size, setSize]
  const stateTheme: [SOW_CSS[0],typeof setTheme] = [theme, setTheme]

  useEffect(onStyle, [theme, size])
  return (
    <div className="btns">
      <span className="width">
        <Btn state={stateSize} as="480">
          480
        </Btn>
        <Btn state={stateSize} as="800">
          800
        </Btn>
      </span>
      <span className="theme">
        <Btn state={stateTheme} as="ririnra">
          漆黒
        </Btn>
        <Btn state={stateTheme} as="cinema">
          煉瓦
        </Btn>
        <Btn state={stateTheme} as="night">
          闇夜
        </Btn>
        <Btn state={stateTheme} as="star">
          蒼穹
        </Btn>
        <Btn state={stateTheme} as="wa">
          和の国
        </Btn>
      </span>
      <span className="theme">
        <a href="sow.cgi?ua=mb">携帯</a>
      </span>
    </div>
  )

  function onStyle() {
    const width = { '480': 'std', '800': 'wide', '': 'wide' }[size]
    body.className = `${theme}-theme ${width}-width`
    link_css.href = `http://s3-ap-northeast-1.amazonaws.com/giji-assets/stylesheets/${theme}${size}.css`
  }

  function setTheme(theme: SOW_CSS[0]) { hitCss(theme, size) }
  function setSize(size: SOW_CSS[1]) { hitCss(theme, size)}
  function hitCss(theme: SOW_CSS[0], size: SOW_CSS[1]) {
    if ('ririnra' === theme) {
      size = ''
    } else {
      if (!size) size = '800'
    }
    setCss([theme, size])
  }
}
