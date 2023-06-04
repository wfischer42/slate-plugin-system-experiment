import { Actions } from './types'
import clsx from 'clsx'
import React from 'react'
import { useSlate } from 'slate-react'
import { FunctionComponent } from 'react'

export const Toolbar: FunctionComponent<{ baseActions: Actions }> = ({ baseActions }) => {
  const editor = useSlate()
  return (
    <>
      <button
        onMouseDown={(event) => {
          event.preventDefault()
          baseActions.toggleMark?.(editor, 'bold')
        }}
        className={clsx(baseActions.isMarkActive?.(editor, 'bold') && 'bg-blue-500')}
      >
        B
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault()
          baseActions.toggleMark?.(editor, 'italic')
        }}
        className={clsx(baseActions.isMarkActive?.(editor, 'italic') && 'bg-blue-500')}
      >
        i
      </button>
    </>
  )
}
