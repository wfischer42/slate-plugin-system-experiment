import { RenderLeafProps } from 'slate-react'
import { CustomEditor, Plugin } from '../types'
import isHotkey from 'is-hotkey'

const isMarkActive: (editor: CustomEditor, format: string) => boolean = (editor, format) => {
  const marks: { [key: string]: any } = editor.getMarks() || {}
  return !!marks[format]
}

const toggleMark = (editor: CustomEditor, format: string) => {
  const marks: { [key: string]: any } = editor.getMarks() || {}
  if (marks[format]) editor.removeMark(format)
  else editor.addMark(format, true)
}

export const marksPlugin: Plugin = () => {
  return {
    newActions: {
      isMarkActive,
      toggleMark,
    },
  }
}

export const boldPlugin: Plugin = (editor: CustomEditor) => {
  const renderLeaf = (leafProps: RenderLeafProps) => {
    if (leafProps.leaf.bold) return <strong {...leafProps.attributes}>{leafProps.children}</strong>
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    isHotkey('mod+b', event) && toggleMark(editor, 'bold')
  }

  return {
    extendedProps: {
      renderLeaf,
      onKeyDown,
    },
  }
}

export const italicPlugin: Plugin = (editor: CustomEditor) => {
  const renderLeaf = (leafProps: RenderLeafProps) => {
    if (leafProps.leaf.italic) return <i {...leafProps.attributes}>{leafProps.children}</i>
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    isHotkey('mod+i', event) && toggleMark(editor, 'italic')
  }

  return {
    extendedProps: {
      renderLeaf,
      onKeyDown,
    },
  }
}

export const formattingPlugins: Plugin[] = [boldPlugin, italicPlugin, marksPlugin]
