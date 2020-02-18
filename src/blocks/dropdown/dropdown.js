import DropdownButton from '../dropdown-button/dropdown-button.js';

class Dropdown {
  constructor(elem, title) {
    this.dropdown = elem;
    this.options = [];
    this.title = title;
    this.opening();
  }

  opening() {
    this.getHTMLElements();
    this.setEventListeners();
    this.setOptions();
    this.selectText = this.select.textContent;
    this.setSelectText(this.selectText);
  }

  setEventListeners() {
    this.select.addEventListener('click', this.SelectClick.bind(this));
    document.addEventListener('changeOption', this.DocumentChangeOption.bind(this));
    if (this.clearButton) {this.clearButton.eventListenerBind('click', this.ClearButtonClick.bind(this))};
    if (this.applyButton) {this.applyButton.eventListenerBind('click', this.ApplyButtonClick.bind(this))};
  }

  getHTMLElements() {
    this.select = this.dropdown.querySelector('.dropdown__name');
    this.clearButton = new DropdownButton('clear', this.dropdown);
    this.applyButton = new DropdownButton('apply', this.dropdown);
    if (!this.clearButton.getButton()) {this.clearButton = undefined};
    if (!this.applyButton.getButton()) {this.applyButton = undefined};
  }
 


}  