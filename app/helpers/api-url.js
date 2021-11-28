import { helper } from '@ember/component/helper';
import ENV from 'front/config/environment';

export default helper(function s3Host(/*, named*/) {
  return ENV.s3Host;
});
