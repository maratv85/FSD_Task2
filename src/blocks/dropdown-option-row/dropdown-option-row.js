class DropdownOptionRow {
    constructor(container) {
      this.container = container;
      this.getElements();
      this.getValues();
      this.setEventListeners();
    }
  
    activateMinus() {
        this.minusButton.classList.remove('dropdown-option-row__round_set-zero');
      }
    
    deactivateMinus() {
        this.minusButton.classList.add('dropdown-option-row__round_set-zero');
      }

    PlusButtonClick() {
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

    MinusButtonClick() {
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
      this.minusButton.addEventListener('click', this.MinusButtonClick.bind(this));
      this.plusButton.addEventListener('click', this.PlusButtonClick.bind(this));
    }
  
    clear() {
      this.deactivateMinus();
      this.value = 0;
      this.number.textContent = this.value;
    }
  }

  export default DropdownOptionRow;