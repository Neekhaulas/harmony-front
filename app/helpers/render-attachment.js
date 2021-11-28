import { helper } from '@ember/component/helper';

export default helper(function renderAttachment(args /*, named*/) {
  let [url] = args;
  return `<img src="${url}" class="image-attachment" />`;
});
