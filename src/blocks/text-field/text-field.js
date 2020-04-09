import IMask from 'imask';

class TextField {
  constructor(container) {
    this.container = container;
    this.setMask();
  }

  setMask() {
    IMask(
      this.container,
      {
        mask: Date,
        lazy: true, /*was false*/
        overwrite: true, /*was true*/
        autofix: true,
        blocks: {
          d: {mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2},
          m: {mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2},
          Y: {mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1999, to: 2099, maxLength: 4}
        }
      }
    );
  }  
}
  
export default TextField

document.addEventListener('DOMContentLoaded', () => {
  const dateMask = document.querySelectorAll('.js-text-field_date-state');
  dateMask.forEach((val) => new TextField(val));
});
