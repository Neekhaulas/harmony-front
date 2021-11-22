import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function emoji([time, full] /*, named*/) {
  if (full) {
    return moment(time).format('LLLL');
  }
  return moment(time).calendar();
});
