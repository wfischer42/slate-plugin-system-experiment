import { RenderElementProps, RenderLeafProps } from 'slate-react'
import { CustomEditor, Plugin } from '../types'

export const paragraphPlugin: Plugin = () => {
  const renderElement = (elementProps: RenderElementProps) => {
    if (elementProps.element.type === 'paragraph')
      return <p {...elementProps.attributes}>{elementProps.children}</p>
  }

  return {
    extendedProps: {
      renderElement,
    },
  }
}

export const blockPlugins: Plugin[] = [paragraphPlugin]
