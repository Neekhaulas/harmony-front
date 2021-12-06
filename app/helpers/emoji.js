import { helper } from '@ember/component/helper';
import ENV from 'front/config/environment';
import { encode } from 'html-entities';
import twemoji from 'twemoji';

export default helper(function emoji([positional] /*, named*/) {
  if (positional == null) return null;

  positional = encode(positional);

  positional = positional.replace(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g,
    '<a target="_blank" class="link" href="$1">$1</a>'
  );

  positional = positional.replace(
    /```(.*)```/gs,
    '<code class="code">$1</code>'
  );

  positional = positional.replace(/\n/g, '<br>');
  let regex = /{:([0-9]*):}/g;
  positional = twemoji.parse(positional, {
    folder: 'svg',
    ext: '.svg',
    className: 'emoji',
  });

  return positional.replace(
    regex,
    `<img class="emoji" emoji-id="$1" style="vertical-align: middle;" src="${ENV.s3Host}$1.png" width="22" height="22" />`
  );
});
