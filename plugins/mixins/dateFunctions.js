import moment from 'moment';
export default {
  filters: {
    formatDate(value) {
        return `${moment(value).format('DD/MM/YYYY')} a las ${moment(value).format('HH:mm')}`;
    },
    formatHour(value) {
      return `${moment(value,'HH:mm').format('HH:mm')}`;
  },

  }
}