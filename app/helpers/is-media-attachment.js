import { helper } from '@ember/component/helper';

export default helper(function isMediaAttachment(args /*, named*/) {
  let [attachment] = args;
  let mediaExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.gifv'];
  for (let i = 0; i < mediaExtensions.length; i++) {
    if (attachment.fileName.endsWith(mediaExtensions[i])) {
      return true;
    }
  }
  return false;
});
