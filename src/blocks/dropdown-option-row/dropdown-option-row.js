class DropdownOptionRow {
    constructor(container) {
      this.container = container;
      this.getElements();
      this.getValues();
      this.setEventListeners();
    }

    getElements() {
      const plusMinuSigns = {
        Increase: '+',
        Decrease: '-'
      };
      this.option = this.container.querySelector('.js-dropdown-option-row');
      this.option.querySelectorAll('.js-dropdown-option-row__round')
        .forEach( (val) => {
          if (val.textContent === plusMinuSigns.Decrease) {this.minusButton = val;}
          if (val.textContent === plusMinuSigns.Increase) {this.plusButton = val;}
        } );
      this.number = this.option.querySelector('.js-dropdown-option-row__number');
    }
  
    getValues() {
      this.value = parseInt(this.number.textContent, 10);
      if (this.value === '') {this.value = 0;}
      if (this.value > 0)    {this.activateMinus();}
      if (this.option.hasAttribute('data-group') ) {
        const { group } = this.option.dataset;
        if (group) {
          this.group = group;
        }
      }
    }
  
    setEventListeners() {
      this.minusButton.addEventListener('click', this.minusButtonClick.bind(this));
      this.plusButton.addEventListener('click', this.plusButtonClick.bind(this));
    }
  
    plusButtonClick() {
      if (this.value === 0) {this.activateMinus();}
      this.value += 1;
      this.number.textContent = this.value;
      this.container.dispatchEvent(
        new CustomEvent('changeOption', {
          bubbles: true,
          detail: this,
        }),
      );
    }

    minusButtonClick() {
      if (this.value > 0) {this.value -= 1;}
      if (this.value === 0) {this.activateMinus();}
      this.number.textContent = this.value;
      this.container.dispatchEvent(
        new CustomEvent('changeOption', {
          bubbles: true,
          detail: this,
        }),
      );
    }

    clear() {
      this.deactivateMinus();
      this.value = 0;
      this.number.textContent = this.value;
    }

    activateMinus() {
      this.minusButton.classList.remove('dropdown-option-row__round_set-zero');
    }
  
    deactivateMinus() {
      this.minusButton.classList.add('dropdown-option-row__round_set-zero');
    }

  }

  export default DropdownOptionRow;