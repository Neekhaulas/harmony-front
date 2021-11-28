import Component from '@glimmer/component';

import { action } from '@ember/object';

import {
  baseKeymap,
  chainCommands,
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock,
} from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import schema from './-internal/schema';
import { DOMParser } from 'prosemirror-model';
import { inputRules, InputRule } from 'prosemirror-inputrules';
import { TextSelection } from 'prosemirror-state';
import { inject as service } from '@ember/service';

export default class ProseMirror extends Component {
  @service editor;
  editorView = null;

  @action
  initializeProseMirror(element) {
    const self = this;
    const { _dispatchTransaction } = this;

    this.editorView = new EditorView(element, {
      dispatchTransaction: _dispatchTransaction.bind(self),
      state: this._buildEditorState(schema, element),
    });

    this.editorView.focus();
    if (this.args.main) {
      this.editor.setEditor(this.editorView);
    }
  }

  @action
  focus() {
    this.editorView?.focus();
  }

  @action
  send(state, dispatch) {
    let content = '';
    let json = state.doc.toJSON();
    json.content.forEach((block, index) => {
      block.content?.forEach((element) => {
        if (element.type === 'text') {
          content += element.text;
        } else if (element.type === 'emoji') {
          content += `{:${element.attrs.id}:}`;
        }
      });
      if (index + 1 != json.content.length) {
        content += '\n';
      }
    });
    console.log(content);
    this.args.onSend(content);
    dispatch(state.tr.delete(0, state.doc.nodeSize - 2));
    return true;
  }

  @action
  cancel() {
    this.args.onCancel();
    return true;
  }

  insertReturn(state, dispatch) {
    dispatch(state.tr.insertText('\n'));
    return true;
  }

  smileyRule() {
    return new InputRule(/{:([0-9]*):}/g, (state, match) => {
      const { tr } = state;

      tr.setSelection(
        TextSelection.create(
          tr.doc,
          tr.selection.from,
          tr.selection.from - match[0].length
        )
      );
      return tr.replaceSelectionWith(
        state.schema.nodes.emoji.create({ id: match[1] })
      );
    });
  }

  buildInputRules(schema) {
    const rules = [];
    if (schema.nodes.emoji) {
      rules.push(this.smileyRule());
    }
    return inputRules({ rules });
  }

  _buildEditorState(s, element) {
    return EditorState.create({
      plugins: [
        history(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          Enter: this.send,
          'Shift-Enter': chainCommands(
            newlineInCode,
            createParagraphNear,
            liftEmptyBlock,
            splitBlock
          ),
          Escape: this.cancel,
        }),
        keymap(baseKeymap),
        this.buildInputRules(s),
      ],
      schema: s,
      doc: DOMParser.fromSchema(s).parse(element),
    });
  }

  _dispatchTransaction(transaction) {
    this.editorView?.updateState(this.editorView.state.apply(transaction));
  }
}
