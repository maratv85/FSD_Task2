import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

class airDatepickerCustom {
  constructor(elementDOM) {
    this.elementDOM = elementDOM;
    this.initPlugin();
  }

  initPlugin() {
    this.initPluginSettings();
    this.initRegionalDateTimeSettings();
    this.createApplyButton();
    this.bindButtonApplyEventListener();
  }

  initPluginSettings() {
    $(this.elementDOM).datepicker({
        startDate: new Date(),
        prevHtml: '<i class="air-datepicker-custom__material-icon">arrow_back</i>',
        nextHtml: '<i class="air-datepicker-custom__material-icon">arrow_forward</i>',
        navTitles: {
          days: 'MM yyyy',
          months: 'yyyy',
          years: 'yyyy1 - yyyy2'},
        multipleDates: true,
        multipleDatesSeparator: ' - ' ,
        range: true,
        clearButton: true
        })
  }      
  
  initRegionalDateTimeSettings() {
    $.fn.datepicker.language.ru = {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yyyy',
            timeFormat: 'hh:ii',
            firstDay: 1
          }  
  }          
  
  createApplyButton() {
    this.datepickerContainer = this.elementDOM.querySelector('.datepicker');
    this.buttonsContainer = this.datepickerContainer.querySelector('.datepicker--buttons');      
    this.buttonApply = document.createElement('span');      
    this.buttonApply.classList.add('air-datepicker-custom__apply-button');
    this.buttonApply.innerText = 'применить';
    this.buttonsContainer.append(this.buttonApply);
  }

  _handleApplyButtonClick() {
    $(this.elementDOM).datepicker().data('datepicker').hide();
  }

  bindButtonApplyEventListener() {
    this.buttonApply.addEventListener('click', this._handleApplyButtonClick());
  }

}

export default airDatepickerCustom

document.addEventListener('DOMContentLoaded', () => {
  const airDatepickers = document.querySelectorAll('.air-datepicker-custom');
  airDatepickers.forEach((val) => new airDatepickerCustom(val));
});