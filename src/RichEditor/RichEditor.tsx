import React, { useState } from 'react'
import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import { boldPlugin, formattingPlugins, italicPlugin, marksPlugin } from './plugins/formatting'
import { composePlugins } from './utils/composePlugins'
import { CustomEditor, Plugin } from './types'
import { Toolbar } from './Toolbar'
import { blockPlugins } from './plugins/blocks'

export const EditorComponent = () => {
  const [editor] = useState<CustomEditor>(() => withHistory(withReact(createEditor())))
  const plugins: Plugin[] = [...formattingPlugins, ...blockPlugins]
  const { editorProps, baseActions } = composePlugins(plugins, editor)

  const [value, setValue] = React.useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'testing' }],
    },
  ])

  return (
    <Slate editor={editor} initialValue={value} onChange={setValue}>
      <Editable {...editorProps} />
      <Toolbar baseActions={baseActions} />
    </Slate>
  )
}
