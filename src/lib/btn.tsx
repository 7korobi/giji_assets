import React from 'react'
import { ReactNode } from 'react'

type BtnProps<T> = {
  state: [T, (val: T) => void]
  as: T
  children: ReactNode
}

export function Btn<T>({ state, as, children }: BtnProps<T>) {
  const mode = state[0] === as ? 'active' : ''
  return (
    <a className={`btn ${mode}`} onClick={onClick}>
      {children}
    </a>
  )

  function onClick() {
    state[1](as)
  }
}

