class DropdownButton {
  constructor(type, container) {
    this.type = type;
    this.container = container;
    this.start(); 
  }
 
  start() {
    this.button = this.container.querySelector(`.js-dropdown-button__${this.type}`);
  };

  setEventListenerButton(type, func) {
    if(this.button) {this.button.addEventListener(type, func)};
  }

  getButton() {
    return this.button;
  }
  
  hideButton() {
    if(this.button) {this.button.classList.add('dropdown-button_invisible')};
  }
  
  showButton() {
    if(this.button) {this.button.classList.remove('dropdown-button_invisible')};
  }
}

export default DropdownButton;