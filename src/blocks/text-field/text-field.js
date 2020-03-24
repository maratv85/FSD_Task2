import IMask from 'imask';

var overwriteMask = IMask(
    document.querySelector('.text-field_date-state'),
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