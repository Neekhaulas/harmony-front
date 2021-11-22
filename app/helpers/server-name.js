import { helper } from '@ember/component/helper';

export default helper(function emoji([positional] /*, named*/) {
  if (positional === null || positional === undefined) return '';
  return positional.substring(0, 2);
});
