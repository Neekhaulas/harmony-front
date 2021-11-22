import { helper } from '@ember/component/helper';
import ENV from 'front/config/environment';
import { encode } from 'html-entities';
import twemoji from 'twemoji';

export default helper(function emoji([positional] /*, named*/) {
  if (positional == null) return null;
  positional = encode(positional);
  let regex = /{:([0-9]*):}/g;
  positional = twemoji.parse(positional, {
    folder: 'svg',
    ext: '.svg',
    className: 'emoji',
  });

  return positional.replace(
    regex,
    `<img class="emoji" style="vertical-align: middle;" src="${ENV.s3Host}$1.png" width="22" height="22" />`
  );
});
