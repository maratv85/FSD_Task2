class DropdownButton {
  constructor(type, container) {
    this.type = type;
    this.containerHTML = container;
    this.start();
  }

  start() {
    this.buttonHTML = this.containerHTML.querySelector(`.js-dropdown-button__${this.type}`);
  }

  getButton() {
    return this.buttonHTML;
  }

  hide() {
    if (this.buttonHTML) this.buttonHTML.classList.add('dropdown-button_hidden');
  }

  show() {
    if (this.buttonHTML) this.buttonHTML.classList.remove('dropdown-button_hidden');
  }

  eventListenerBind(type, func) {
    if (this.buttonHTML) this.buttonHTML.addEventListener(type, func);
  }
}

export default DropdownButton;
