
class CheckboxList {
  constructor(elem) {
    this.elem = elem;
    this.init();
    this.bindClickEvent();
  }

  init() {
    this.listArrow = this.elem.querySelector('.js-checkbox-list__arrow');
    this.listHeader = this.elem.querySelector('.js-checkbox-list__header');
    this.listItems = this.elem.querySelector('.js-checkbox-list__items-list');
  }

  bindClickEvent() {
    this.listHeader.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick() {
    this.listItems.classList.toggle('checkbox-list__items-list_invisible');
    if (!this.listItems.classList.contains('checkbox-list__items-list_invisible')) {
      this.listArrow.classList.add('checkbox-list__arrow_less');
    } else {
      this.listArrow.classList.remove('checkbox-list__arrow_less');
    }
  }
}

export default CheckboxList;

document.addEventListener('DOMContentLoaded', () => {
  const checkboxList = document.querySelectorAll('.js-checkbox-list');
  checkboxList.forEach((val) => new CheckboxList(val));
});
