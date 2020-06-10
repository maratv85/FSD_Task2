import DropdownOption from '../dropdown-option/dropdown-option';
import DropdownButton from '../dropdown-button/dropdown-button';

class Dropdown {
  constructor(elem, titleCases) {
    this.dropdown = elem;
    this.options = [];
    this.titleCases = titleCases;
    this.start();
  }

  start() {
    this.getHTMLElements();
    this.bindEventListeners();
    this.setOptions();
    this.selectText = this.select.textContent;
    this.setSelectText(this.selectText);
  }

  getHTMLElements() {
    this.select = this.dropdown.querySelector('.js-dropdown__select');
    this.clearButton = new DropdownButton('clear', this.dropdown);
    this.applyButton = new DropdownButton('apply', this.dropdown);
  }

  bindEventListeners() {
    this.select.addEventListener('click', this.handleSelectClick.bind(this));
    this.dropdown.addEventListener('changeOption', this.handleDocumentChangeOption.bind(this));
    if (this.clearButton) this.clearButton.eventListenerBind('click', this.handleClearButtonClick.bind(this));
    if (this.applyButton) this.applyButton.eventListenerBind('click', this.handleApplyButtonClick.bind(this));
  }

  setOptions() {
    const optionsList = this.dropdown.querySelectorAll('.js-dropdown__option');
    optionsList.forEach((currentOption) => {
      const newOption = new DropdownOption(currentOption);
      const desiredOption = this.options.find((optionIterationItem) => {
        if (optionIterationItem.group === newOption.group) return true;
        return false;
      });
      if (desiredOption) {
        desiredOption.options.push(newOption);
      } else {
        this.options.push({ group: newOption.group, options: [newOption] });
      }
    });
  }

  handleDocumentChangeOption() {
    this.activateClear();
    this.calculateSelectText();
  }

  calculateSelectText() {
    let summaryText = '';
    summaryText = this.options.map((option, item) => {
      const groupName = option.group.toLowerCase();
      let groupValue = 0;

      option.options.forEach((val) => {
        groupValue += parseInt(val.value, 10);
      });

      if (groupValue === 0 && item !== 0) return '';

      const cases = this.checkPad(groupValue);
      const isTitlesAvailable = this.titleCases
        || this.titleCases[groupName]
        || this.titleCases[groupName][cases];

      if (!isTitlesAvailable) {
        return ` ${groupValue} ${groupName}`;
      }
      const groupText = this.titleCases[groupName][cases];

      return ` ${groupValue} ${groupText}`;
    });
    summaryText = summaryText.filter((entry) => entry.trim() !== '');

    let finalText = '';
    summaryText.forEach((item, i) => {
      if (i === summaryText.length - 1) finalText += item.replace(/,\s/g, '');
      else finalText += `${item.replace(/,\s/g, '')}, `;
    });

    return this.setSelectText(finalText);
  }

  handleSelectClick() {
    if (this.select.classList.contains('dropdown__select_active')) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }

  showDropdown() {
    this.select.classList.add('dropdown__select_active');
    const dropdown = this.select.parentNode;
    const selectOptions = dropdown.querySelector('.js-dropdown__options');
    selectOptions.classList.add('dropdown__options_active');

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.handleDocumentClick);
  }

  hideDropdown() {
    this.select.classList.remove('dropdown__select_active');
    const dropdown = this.select.parentNode;
    const selectOptions = dropdown.querySelector('.js-dropdown__options');
    selectOptions.classList.remove('dropdown__options_active');
    document.removeEventListener('click', this.handleDocumentClick);

    if (this.dropdown.querySelector('.js-dropdown__select')
      .textContent.match(/\d{1}/).shift() === '0') {
      this.setSelectText(this.selectText);
      this.deactivateClear();
      this.clearOptions();
    }
  }

  handleDocumentClick(event) {
    const { target } = event;
    const itsMenu = target === this.dropdown || this.dropdown.contains(target);
    if (!itsMenu) {
      this.hideDropdown(event);

      if (this.dropdown.querySelector('.js-dropdown__select')
        .textContent.match(/\d{1}/).shift() === '0') {
        this.setSelectText(this.selectText);
        this.deactivateClear();
        this.clearOptions();
      }
    }
  }

  activateClear() {
    if (this.clearButton) this.clearButton.show();
  }

  deactivateClear() {
    if (this.clearButton) this.clearButton.hide();
  }

  clearOptions() {
    this.options.forEach((val) => {
      val.options.forEach((option) => {
        option.clear();
      });
    });
  }

  handleClearButtonClick() {
    this.clearOptions();
    this.deactivateClear();
    if (this.selectText) {
      this.setSelectText(this.selectText);
    } else {
      this.calculateSelectText();
    }
  }

  handleApplyButtonClick() {
    this.hideDropdown();
  }

  setSelectText(text) {
    if (text || text !== '') {
      this.select.textContent = text;
      return text;
    }
    this.select.textContent = this.selectText;
    return this.calculateSelectText();
  }

  checkPad(num) {
    const lastOne = num.toString().split('').pop();
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
