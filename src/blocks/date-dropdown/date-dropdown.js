import AirDatepickerCustom from '../air-datepicker-custom/air-datepicker-custom';

class DateDropdown {
  constructor(calendar) {
    this.$calendar = $(calendar);
    this.findDOMElements();
    this.initCalendar();
  }

  findDOMElements() {
    this.$standalone = this.$calendar.find('.js-date-field__input-standalone-date');
    this.$standaloneInput = this.$standalone.find('input.js-text-field');
    this.isRange = false;
    if (this.$standalone.length === 0) {
      this.$start = this.$calendar.find('.js-date-field__input-start-date');
      this.$startInput = this.$start.find('input.js-text-field');

      this.$end = this.$calendar.find('.js-date-field__input-end-date');
      this.$endInput = this.$end.find('input.js-text-field');

      this.isRange = true;
      this.startInputInstance = this.$startInput.datepicker().data('datepicker');
    }
  }

  initCalendar() {
    if (this.isRange) {
      const { $startInput, $endInput } = this;
      $startInput.datepicker({
        range: true,
        language: 'ru',
        multipleDatesSeparator: ' - ',
        clearButton: true,
        onSelect(formattedDate) {
          $startInput.val(formattedDate.split('-')[0]);
          $endInput.val(formattedDate.split('-')[1]);
        },
      });
      new AirDatepickerCustom(this.$startInput.datepicker().data('datepicker'));
      this.handleEndInput();
    } else {
      this.$standaloneInput.datepicker({
        range: true,
        language: 'ru',
        dateFormat: 'dd M',
        clearButton: true,
        multipleDatesSeparator: ' - ',
      });
      this.datePickercustom = new AirDatepickerCustom(this.$standaloneInput.datepicker().data('datepicker'));
      // this.datePickercustom.handleCalendarResize();
    }
  }

  _handleEndInputClick() {
    this.startInputInstance.show();
  }

  handleEndInput() {
    this.$end.on('click', this._handleEndInputClick.bind(this));
  }
}

export default DateDropdown;

document.addEventListener('DOMContentLoaded', () => {
  const dateDropdownInit = document.querySelectorAll('.js-date-dropdown');
  dateDropdownInit.forEach((val) => new DateDropdown(val));
});
