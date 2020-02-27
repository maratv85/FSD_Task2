import DropdownButton from '../dropdown-button/dropdown-button.js';


//dropdown options class
class Option {
  constructor(container) {
    this.container = container;
    this.getHTMLElementsOpt();
    this.getValues();
    this.eventListeners();
  }

  getHTMLElementsOpt() {
    const plusMinuSigns = {
      Increase: '+',
      Decrease: '-'
    };

    this.option = this.container.querySelector('.dropdown__container-for-options');
    this.option.querySelectorAll('.dropdown__option-round').forEach( (val) => {
      if (val.textContent === plusMinuSigns.Decrease) {this.minusButton = val;}
      if (val.textContent === plusMinuSigns.Increase) {this.plusButton = val;}
    });
    this.number = this.option.querySelector('.dropdown-option-number');
  }

  getValues() {
    this.value = parseInt(this.number.textContent, 10);
    if (this.value === '') this.value = 0;
    if (this.value > 0) this.activateMinus();
    if (this.option.hasAttribute('data-group')) {
      const { group } = this.option.dataset;
      if (group) {
        this.group = group;
      }
    }
  }

  eventListeners() {
    this.minusButton.addEventListener('click', this.MinusButtonClick.bind(this));
    this.plusButton.addEventListener('click', this.PlusButtonClick.bind(this));
  }

  MinusButtonClick() {
    if (this.value > 0) {this.value -= 1;}
    if (this.value === 0) {this.deactivateMinus();}
    this.number.textContent = this.value;
    document.dispatchEvent(
      new CustomEvent('changeOption', {
        bubbles: true,
        detail: this,
      }),
    );
  }

  PlusButtonClick() {
    if (this.value === 0) {
      this.activateMinus(this.minusButton);
    }
    this.value += Number(1);
    this.number.textContent = this.value;
    document.dispatchEvent(
      new CustomEvent('changeOption', {
        bubbles: true,
        detail: this,
      }),
    );
  }

  activateMinus() {
    this.minusButton.classList.remove('.dropdown__option-round_zero-counted');
  }

  deactivateMinus() {
    this.minusButton.classList.add('.dropdown__option-round_zero-counted');
  }

  clear() {
    this.deactivateMinus();
    this.value = 0;
    this.number.textContent = this.value;
  }
}
//=====================================
//--- End class Option description ---
//=====================================
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
    this.select.addEventListener('click', this.setSelectClick.bind(this));
    document.addEventListener('changeOption', this.DocumentChangeOption.bind(this));
    if (this.clearButton) {this.clearButton.setEventListenerButton('click', this.clearButtonClick.bind(this))};
    if (this.applyButton) {this.applyButton.setEventListenerButton('click', this.applyButtonClick.bind(this))};
  }

  getHTMLElements() {
    this.select = this.dropdown.querySelector('.dropdown__name');
    this.clearButton = new DropdownButton('clear', this.dropdown);
    this.applyButton = new DropdownButton('apply', this.dropdown);
    if (!this.clearButton.getButton()) {this.clearButton = undefined};
    if (!this.applyButton.getButton()) {this.applyButton = undefined};
  }
 
  setOptions() {
    const options = this.dropdown.querySelectorAll('.dropdown__option');
    options.forEach((currentOption) => {
      const newOption    = new Option(currentOption);
      const targetOption = this.options.find( (optionItem) => {
        if (optionItem.group === newOption.group) {return true;}
        else {return false;}
      });
      if (targetOption) {
        targetOption.options.push(newOption);
      } else {
        this.options.push({group: newOption.group, options: [newOption]});
      }
    });
  }
  
  DocumentChangeOption() {
    this.setClear();
    this.calcText();
  }

  calcText() {
    let summaryText = [];
    summaryText = this.options.map( (option, item) => {
      let groupValue = 0;
      const groupName = option.group.toLowerCase();

      option.options.forEach( (val) => {
        groupValue += parseInt(val.value, 10);
      });

      if (groupValue === 0 && item !== 0) return '';

      const cases = this.checkOpt(groupValue);
      const isTitleAvailable = this.titleCases
        || this.titleCases[groupName]
        || this.titleCases[groupName][cases];

      if (!isTitleAvailable) {return ` ${groupValue} ${groupName}`;}
      const groupText = this.titleCases[groupName][cases];
      return ` ${groupValue} ${groupText}`;
    });
    summaryText = summaryText.filter( (entry) => entry.trim() !== '');

    let finalText;
    summaryText.forEach( (item, i) => {
      if (i === summaryText.length - 1) 
        {finalText += item.replace(/,\s/g, '');}
      else {finalText += `${item.replace(/,\s/g, '')}, `;}
    });
    return this.setText(finalText);
  }

  setSelectClick() {
    if (this.select.classList.contains('.dropdown__name_active')) 
      {this.hideDropdown();} 
    else {this.showDropdown();}
  }

  showDropdown() {
    this.select.classList.add('.dropdown__name_active');
    const dropdown = this.select.parentNode;
    const selectOptions = dropdown.querySelector('.dropdown__options');
    selectOptions.classList.add('.dropdown__options_active');

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.handleDocumentClick);
  }

  hideDropdown() {
    this.select.classList.remove('.dropdown__name_active');
    const dropdown = this.select.parentNode;
    const selectOptions = dropdown.querySelector('.dropdown__options');
    selectOptions.classList.remove('.dropdown__options_active');
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
    if (this.clearButton) this.clearButton.show();
  }

  unsetClear() {
    if (this.clearButton) this.clearButton.hide();
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
      this.calText();
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

export {Option, Dropdown}