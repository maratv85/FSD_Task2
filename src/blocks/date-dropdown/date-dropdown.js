import AirDatepickerCustom from '../air-datepicker-custom/air-datepicker-custom.js';
//import DateField from '../date-field/date-field.js';

class DateDropdown {
  constructor(calendar) {
    this.calendar = calendar;
    this.findDOMElements();
    this.initCalendar();
  }

  findDOMElements() {
    this.standaloneInput = this.calendar.querySelector('.js-date-field__input-standalone-date');
    this.isRange = false;
    if (!this.calendar.classList.contains('.js-date-field__input-standalone-date')) {}
      this.startInput = this.calendar.querySelector('.js-date-field__input-start-date');
      this.endInput = this.calendar.querySelector('.js-date-field__input-end-date');
      this.startInput.classList.add('.js-text-field_date-state');
      this.endInput.classList.add('.js-text-field_date-state'); 
      this.startInput.setAttribute('readonly', true);
      this.endInput.setAttribute('readonly', true);
      this.isRange = true;
      this.datepickerInstance = $(this.startInput).datepicker().data('datepicker');
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
      this.datepickerInput = new AirDatepickerCustom($(this.startInput).datepicker().data('datepicker'));
     //
    }
    else {
      $(this.standaloneInput).datepicker({
        range: true,
        language: 'ru', 
        dateFormat: 'dd M',
        clearButton: true,
        multipleDatesSeparator: ' - ',
      });
      this.datepickerInput = new AirDatepickerCustom($(this.startInput).datepicker().data('datepicker'));
      this.datepickerInput.show();
    }
  }  

  }

  export default DateDropdown;

 

