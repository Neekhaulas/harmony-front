const maxResults = 10;
let selectedIndex = 0;
let emojiList = [':frank:'];
let showSuggestions = false;

export const suggestEmojis = {
  // By default decorations are used to highlight the currently matched
  // suggestion in the dom.
  // In this example we don't need decorations (in fact they cause problems when the
  // emoji string replaces the query text in the dom).
  noDecorations: false,
  char: ':', // The character to match against
  name: 'emoji-suggestion', // a unique name
  appendText: '', // Text to append to the created match

  // Keybindings are similar to prosemirror keymaps with a few extra niceties.
  // The key identifier can also include modifiers (e.g.) `Cmd-Space: () => false`
  // Return true to prevent any further keyboard handlers from running.
  keyBindings: {
    ArrowUp: () => {
      // selectedIndex = rotateSelectionBackwards(selectedIndex, emojiList.length);
    },
    ArrowDown: () => {
      // selectedIndex = rotateSelectionForwards(selectedIndex, emojiList.length);
    },
    Enter: ({ command }) => {
      if (showSuggestions) {
        command(emojiList[selectedIndex]);
      }
    },
    Esc: () => {
      showSuggestions = false;
    },
  },

  onChange: (params) => {
    console.log(params);
    const query = params.query.full;
    emojiList = [':frank:'];
    selectedIndex = 0;
    showSuggestions = true;
  },

  onExit: () => {
    showSuggestions = false;
    emojiList = [];
    selectedIndex = 0;
  },

  // Create a  function that is passed into the change, exit and keybinding handlers.
  // This is useful when these handlers are called in a different part of the app.
  createCommand: ({ match, view }) => {
    return (emoji, skinVariation) => {
      if (!emoji) {
        throw new Error(
          'An emoji is required when calling the emoji suggesters command'
        );
      }

      const tr = view.state.tr;
      const { from, end: to } = match.range;
      tr.insertText(emoji, from, to);
      view.dispatch(tr);
    };
  },
};
