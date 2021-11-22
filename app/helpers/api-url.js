import { helper } from '@ember/component/helper';
import ENV from 'front/config/environment';

export default helper(function s3Host(/*, named*/) {
  console.log(ENV.s3Host);
  return ENV.s3Host;
});
