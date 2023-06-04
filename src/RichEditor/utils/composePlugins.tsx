import React from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import { Plugin, CustomEditor, PluginBaseProps, Actions } from '../types'

export const composePlugins = (
  plugins: Plugin[],
  editor: CustomEditor
): { editorProps: PluginBaseProps; baseActions: Actions } => {
  let baseProps: PluginBaseProps = {
    renderLeaf: (props: RenderLeafProps) => <span {...props.attributes}>{props.children}</span>,
    renderElement: (props: RenderElementProps) => <div {...props.attributes}>{props.children}</div>,
    onKeyDown: () => {},
  }

  let baseActions: Actions = { toggleMark: () => {}, isMarkActive: () => false }

  plugins.forEach((plugin) => {
    const { newActions, extendedProps: newProps } = plugin(editor)

    if (newProps?.renderLeaf) {
      const oldRenderLeaf = baseProps.renderLeaf
      baseProps.renderLeaf = (props: RenderLeafProps) => {
        return (
          newProps.renderLeaf!({ ...props, children: oldRenderLeaf(props) }) || oldRenderLeaf(props)
        )
      }
    }

    if (newProps?.renderElement) {
      const oldRenderElement = baseProps.renderElement
      baseProps.renderElement = (props: RenderElementProps) => {
        return newProps.renderElement!(props) || oldRenderElement!(props)
      }
    }

    if (newProps?.onKeyDown) {
      const oldOnKeyDown = baseProps.onKeyDown
      baseProps.onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        newProps.onKeyDown && newProps.onKeyDown(event)
        oldOnKeyDown?.(event)
      }
    }
    baseActions = { ...baseActions, ...newActions }
  })

  return { editorProps: baseProps, baseActions }
}
