import AirDatepickerCustom from '../air-datepicker-custom/air-datepicker-custom';

class InlineCalendar {
  constructor(calendar) {
    this.$calendar = $(calendar)
    this.initCalendar();
  }

  initCalendar() { 
    this.$calendar.datepicker({
      inline: true,
      range: true,
      language: 'ru', 
      dateFormat: 'dd M',
      clearButton: true,
      multipleDatesSeparator: ' - ',
    });
    new AirDatepickerCustom(this.$calendar.datepicker().data('datepicker'));  
  }  
}

export default InlineCalendar;

document.addEventListener('DOMContentLoaded', () => {
  const inlineCalendarInit = document.querySelectorAll('.js-inline-calendar');
  inlineCalendarInit.forEach((val) => new InlineCalendar(val));
});