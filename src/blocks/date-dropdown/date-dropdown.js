import AirDatepickerCustom from '../air-datepicker-custom/air-datepicker-custom.js';
//import DateField from '../date-field/date-field.js';

class DateDropdown {
  constructor(calendar) {
    this.calendar = calendar;
    this.findDOMElements();
    this.initCalendar();
  }

  findDOMElements() {
    this.standalone = this.calendar.querySelector('.js-date-field__input-standalone-date');
    this.standaloneInput = this.standalone.querySelector('input.js-text-field');
    this.isRange = false;
    if (this.standalone === null) {
      this.start = this.calendar.querySelector('.js-date-field__input-start-date');
      this.startInput = this.start.querySelector('input.js-text-field');

      this.end = this.calendar.querySelector('.js-date-field__input-end-date');
      this.endInput = this.end.querySelector('input.js-text-field');

      this.isRange = true;
      $(this.startInput).datepicker().data('datepicker');
    }
   }  
  
  initCalendar() {
    if (this.isRange) {
      $(this.startInput).datepicker({
        range: true,
        language: 'ru',
        multipleDatesSeparator: ' - ',
        clearButton: true,
        onSelect(formattedDate) {
          $(this.startInput).val(formattedDate.split('-')[0]);
          $(this.endInput).val(formattedDate.split('-')[1]);
      }
     });
     this.datepickerPluginInstance = $(this.startInput).datepicker().data('datepicker');
     new AirDatepickerCustom(this.datepickerPluginInstance);
    }
    else {
      $(this.standaloneInput).datepicker({
        range: true,
        language: 'ru', 
        dateFormat: 'dd M',
        clearButton: true,
        multipleDatesSeparator: ' - ',
      });
      this.datepickerPluginInstance = $(this.standaloneInput).datepicker().data('datepicker');
      new AirDatepickerCustom(this.datepickerPluginInstance);
      this.datepickerInput.show();
    };
  };  

  }

  export default DateDropdown;

  document.addEventListener('DOMContentLoaded', () => {
   const dateDropdownInit = document.querySelectorAll('.js-date-dropdown');
   dateDropdownInit.forEach((val) => new DateDropdown(val));
 }); 

 

