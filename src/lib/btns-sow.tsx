import React, { useState, useEffect } from 'react'
import { Btn } from './btn'

const [defaultCSS, defaultTheme, defaultSize] =
  location.search.match(/css=(ririnra|cinema|night|star|wa)(480|800|)/) || []

export function BtnsSow() {
  const stateTheme = useState<'ririnra' | 'cinema' | 'night' | 'star' | 'wa'>(
    (defaultTheme || 'cinema') as any
  )
  const stateSize = useState<'' | '480' | '800'>(
    (defaultSize || (defaultTheme === 'ririnra' ? '' : '800')) as any
  )
  const theme = stateTheme[0]
  let size = stateSize[0]

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
    if ('ririnra' === theme) {
      size = ''
    } else {
      if (!size) size = '800'
    }
    const cssParam = `css=${theme}${size}`
    if (!location.search.includes(cssParam)) {
      location.search = cssParam
    }
  }
}

