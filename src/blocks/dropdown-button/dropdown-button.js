class DropdownButton {
  constructor(type, container) {
    this.type = type;
    this.container = container;
    this.opening(); 
  }
 
  opening() {
    this.button = this.container.querySelector(`.dropdown-button__${this.type}`);
  };

  setEventListenerButton(type, func) {
    if(this.button) {this.button.addEventListener(type, func)};
  }

  getButton() {
    return this.button;
  }
  
  hideButton() {
    if(this.button) {this.button.classList.add('.dropdown-button_hidden')};
  }
  
  showButton() {
    if(this.button) {this.button.classList.remove('.dropdown-button_hidden')};
  }
}

export default DropdownButton;