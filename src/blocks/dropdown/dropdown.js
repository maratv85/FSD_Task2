import DropdownOptionRow from '../dropdown-option-row/dropdown-option-row';
import DropdownButton from '../dropdown-button/dropdown-button';

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

  getHTMLElements() {
    this.select = this.dropdown.querySelector('.js-dropdown__selected-options');
    this.clearButton = new DropdownButton('clear', this.dropdown);
    this.applyButton = new DropdownButton('apply', this.dropdown);
    if (!this.clearButton.getButton()) {this.clearButton = null};
    if (!this.applyButton.getButton()) {this.applyButton = null};
  }

  setEventListeners() {
    this.select.addEventListener('click', this.setSelectClick.bind(this));
    this.dropdown.addEventListener('changeOption', this.documentChangeOption.bind(this));
    if (this.clearButton) {this.clearButton.setEventListenerButton('click', this.clearButtonClick.bind(this))};
    if (this.applyButton) {this.applyButton.setEventListenerButton('click', this.applyButtonClick.bind(this))};
  }
 
  setOptions() {
    const options = this.dropdown.querySelectorAll('.js-dropdown-option-row');
    options.forEach( (currentOption) => {
      const newOption    = new DropdownOptionRow(currentOption);
      const targetOption = this.options.find( (optionItem) => {
        if (optionItem.group === newOption.group) {return true;}
        return false;
      });
      if (targetOption) {
        targetOption.options.push(newOption);
      } else {
        this.options.push({group: newOption.group, options: [newOption]});
      }
    } );
  }
  
  documentChangeOption() {
    this.setClear();
    this.calcText();
  }

  calcText() {
    let summaryText = '';
    summaryText = this.options.map( (option, item) => {
      const groupName = option.group.toLowerCase();
      let groupValue = 0;

      option.options.forEach( (val) => {
        groupValue += parseInt(val.value, 10);
      });

      if (groupValue === 0 && item !== 0) return '';

      const cases = this.checkOpt(groupValue);
      const isTitleAvailable = this.title
        || this.title[groupName]
        || this.title[groupName][cases];

      if (!isTitleAvailable) {return ` ${groupValue} ${groupName}`;}
      const groupText = this.title[groupName][cases];
      return ` ${groupValue} ${groupText}`;
    });
    summaryText = summaryText.filter( (entry) => entry.trim() !== '');

    let finalText = '';
    summaryText.forEach( (item, i) => {
      if (i === summaryText.length - 1) 
        {finalText += item.replace(/,\s/g, '');}
      else {finalText += `${item.replace(/,\s/g, '')}, `;}
    });
    return this.setText(finalText);
  }

  setSelectClick() {
    if (this.select.classList.contains('dropdown__selected-options_active')) 
      {this.hideDropdown();} 
    else 
      {this.showDropdown();}
  }

  showDropdown() {
    this.select.classList.add('dropdown__selected-options_active');
    const dropdown = this.select.parentNode;
    const selectOptions = dropdown.querySelector('.js-dropdown__options');
    selectOptions.classList.add('dropdown__options_active');

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.handleDocumentClick);
  }

  hideDropdown() {
    this.select.classList.remove('dropdown__selected-options_active');
    const dropdown = this.select.parentNode;
    const selectOptions = dropdown.querySelector('.js-dropdown__options');
    selectOptions.classList.remove('dropdown__option_active');
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    const { target } = event;
    const itsMenu = target === this.dropdown || this.dropdown.contains(target);
    if (!itsMenu) {
      this.hideDropdown(event);
    }
  }

  setClear() {
    if (this.clearButton) this.clearButton.showButton();
  }

  unsetClear() {
    if (this.clearButton) this.clearButton.hideButton();
  }

  clearButtonClick() {
    this.options.forEach( (val) => {
      val.options.forEach( (option) => {
        option.clear();
      });
    });
    this.setClear();
    if (this.selectText) {
      this.setText(this.selectText);
    } else {
      this.calcText();
    }
  }

  applyButtonClick() {
    this.hideDropdown();
  }

  setText(text) {
    if (text || text !== '') {
      this.select.textContent = text;
      return text;
    }
    this.select.textContent = this.selectText;
    return this.calcText();
  }

  checkOpt(num) {
    const lastOne = num
      .toString()
      .split('')
      .pop();
    const isNumBetweenOneAndFive = Number(lastOne) > 1 && Number(lastOne) < 5;
    const isNumBetweenNineAndTwentyOne = Number(num) > 9 && Number(num) < 21;
    let tmp;
    if (Number(lastOne) === 1) tmp = 0;
    else if (isNumBetweenOneAndFive) tmp = 1;
    else tmp = 2;
    if (isNumBetweenNineAndTwentyOne) {
      tmp = 2;
    }
    return tmp;
  }
}  

export default Dropdown;