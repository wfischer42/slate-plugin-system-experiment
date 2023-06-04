import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import { EditableProps } from "slate-react/dist/components/editable";

export type Plugin = (
  editableProps: EditableProps,
  editor: Editor
) => EditableProps;

export const composeEditableProps = (
  plugins: Plugin[],
  editor: ReactEditor
): EditableProps => {
  let editableProps: EditableProps = {};
  for (const plugin of plugins) {
    editableProps = plugin(editableProps, editor);
  }
  return editableProps;
};
