import autocomplete from 'prosemirror-autocomplete';

// Alternatively, use a single reducer to handle all actions:
const options = {
  triggers: [
    { name: 'hashtag', trigger: '#' },
    { name: 'mention', trigger: '@' },
  ],
  reducer: (action) => {
    console.log(action);
  },
};

export const suggester = autocomplete(options);
