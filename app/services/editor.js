import Service from '@ember/service';
import { action } from '@ember/object';

export default class EditorService extends Service {
  editorView = null;

  setEditor(editor) {
    this.editorView = editor;
  }

  insertEmoji(emoji) {
    this.editorView.dispatch(this.editorView.state.tr.insertText(emoji));
    this.editorView.focus();
  }

  insertCustomEmoji(id) {
    this.editorView.dispatch(
      this.editorView.state.tr.replaceSelectionWith(
        this.editorView.state.schema.nodes.emoji.create({ id: id })
      )
    );
    this.editorView.focus();
  }
}
