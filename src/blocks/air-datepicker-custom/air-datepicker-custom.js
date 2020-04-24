import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

class AirDatepickerCustom {
  constructor(pluginInstance, calendar) {
    this.pluginInstance = pluginInstance;
    this.calendar = calendar;
    this.initPlugin();
  }

  initPlugin() {
    this.findElements();
    this.setPluginOptions();
    this.addAirDatepickerCustomClass();
    this.createApplyButton();
    this.bindButtonApplyEventListener();
    this.handleCalendarResize();
  }

  findElements() {
    this.$datepicker = this.pluginInstance.$datepicker;
    this.$input = this.pluginInstance.$el;
  }

  setPluginOptions() {
    this.$input.datepicker({
        prevHtml: '<i class="air-datepicker-custom__material-icon">arrow_back</i>',
        nextHtml: '<i class="air-datepicker-custom__material-icon">arrow_forward</i>',
        navTitles: {
          days: 'MM <i>yyyy</i>'}
    })
  }   
  
  createApplyButton() {
    this.$buttonsContainer = this.$datepicker.find('.datepicker--buttons');      
    this.$buttonApply = $('<span class="air-datepicker-custom__apply-button">Применить</span>'
    ).appendTo(this.$buttonsContainer);      
  }

  bindButtonApplyEventListener() {
    this.$buttonApply.on('click', this._handleApplyButtonClick.bind(this));
  }

  handleCalendarResize() {
    this.containerCalendar = this.calendar.find('.date-dropdown__input');
    const containerWidth = this.containerCalendar.width();
    if(containerWidth === 266) {
      this.$datepicker.css({'transform' : 'scale(0.85)', 'transform-origin' : '0 0 0'});
    }
  }

  _handleApplyButtonClick() {
    this.pluginInstance.hide();
  }

  addAirDatepickerCustomClass() {
    this.$input.datepicker({
      classes: 'air-datepicker-custom__modifier'
    })
  }

}

export default AirDatepickerCustom

// document.addEventListener('DOMContentLoaded', () => {
//   const airDatepickers = document.querySelectorAll('.air-datepicker-custom');
//   airDatepickers.forEach((val) => new AirDatepickerCustom(val));
// });
