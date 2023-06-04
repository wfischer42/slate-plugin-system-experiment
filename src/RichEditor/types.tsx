import React from 'react'
import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor, RenderLeafProps } from 'slate-react'
import { EditableProps, RenderElementProps } from 'slate-react/dist/components/editable'

export type Actions = {
  toggleMark?: (editor: CustomEditor, format: string) => void
  isMarkActive?: (editor: CustomEditor, format: string) => boolean
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type CustomElement = { type: 'paragraph'; children: CustomText[] }

export type CustomText = { text: string; bold?: true; italic?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type Plugin = (editor: CustomEditor) => {
  extendedProps?: {
    renderLeaf?: (leafProps: RenderLeafProps) => JSX.Element | null | undefined
    renderElement?: (elementProps: RenderElementProps) => JSX.Element | null | undefined
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  }
  newActions?: Actions
}

export type PluginBaseProps = EditableProps & {
  renderLeaf: (props: RenderLeafProps) => JSX.Element
}
