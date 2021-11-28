import { helper } from '@ember/component/helper';
import { encode } from 'html-entities';
import ENV from 'front/config/environment';

export default helper(function editorFormat([positional] /*, named*/) {
  let regex = /{:([0-9]*):}/g;
  positional = positional.replace(
    regex,
    `<img class="emoji" emoji-id="$1" style="vertical-align: middle;" src="${ENV.s3Host}$1.png" />`
  );
  let result = '<p>' + positional + '</p>';
  result = result.replace(/\n/g, '</p><p>');
  return result;
});
