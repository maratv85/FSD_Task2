import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

class AirDatepickerCustom {
  constructor(pluginInstance, secondInput, type) {
    this.pluginInstance = pluginInstance;
    this.secondInput = secondInput;
    this.type = type;
    this.initPlugin();
  }

  initPlugin() {
    this.decoratePlugin();
    this.createApplyButton();
    this.bindButtonApplyEventListener();
    this.datepickerTypeOptions();
  }



  decoratePlugin() {
    $(this.pluginInstance).datepicker({
        prevHtml: '<i class="air-datepicker-custom__material-icon">arrow_back</i>',
        nextHtml: '<i class="air-datepicker-custom__material-icon">arrow_forward</i>',
        navTitles: {
          days: 'MM <i>yyyy</i>'}
    })
  }  
  
  datepickerTypeOptions() {
    if (this.type === 'range') {
      $(this.pluginInstance).datepicker({
        range: true,
        language: 'ru',
        multipleDatesSeparator: ' - ',
        clearButton: true,
        onSelect(formattedDate) {
          this.pluginInstance.val(formattedDate.split('-')[0]);
          this.secondInput.val(formattedDate.split('-')[1]);
        }
      });
    } else 
    if (this.type === 'standalone') {
      $(this.pluginInstance).datepicker({
        range: true,
        language: 'ru', 
        dateFormat: 'dd M',
        clearButton: true,
        multipleDatesSeparator: ' - ',
      });
      this.datepickerPluginInstance = $(this.pluginInstance).datepicker().data('datepicker');
      this.datepickerInput.show();
    }
  }       
  
  createApplyButton() {
    this.datepickerContainer = this.pluginInstance.querySelector('.datepicker');
    this.buttonsContainer = this.datepickerContainer.querySelector('.datepicker--buttons');      
    this.buttonApply = document.createElement('span');      
    this.buttonApply.classList.add('air-datepicker-custom__apply-button');
    this.buttonApply.innerText = 'применить';
    this.buttonsContainer.append(this.buttonApply);
  }

  _handleApplyButtonClick() {
    this.pluginInstance.datepicker().data('datepicker').hide();
  }

  bindButtonApplyEventListener() {
    this.buttonApply.addEventListener('click', this._handleApplyButtonClick());
  }

}

export default AirDatepickerCustom

// document.addEventListener('DOMContentLoaded', () => {
//   const airDatepickers = document.querySelectorAll('.air-datepicker-custom');
//   airDatepickers.forEach((val) => new AirDatepickerCustom(val));
// });