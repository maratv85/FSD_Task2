import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

$('.air-datepicker-custom').datepicker({
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
    clearButton: true,
    })

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
 
this.buttonsContainer = document.querySelector('.datepicker--buttons');      
this.buttonApply = document.createElement('span');      
buttonApply.classList.add('air-datepicker-custom__apply-button');
buttonApply.innerText = 'применить';
buttonsContainer.append(this.buttonApply);