import '../../../node_modules/item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
//import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';

$(document).ready(() => {
    $('.iqdropdown').iqDropdown({ 
        // max total items
        maxItems: 10,
        // min total items
        minItems: 0,
        // text to show on the dropdown
        selectionText: 'item',
        // text to show for multiple items
        textPlural: 'items',
        // buttons to increment/decrement
        controls: {
          position: 'right',
          displayCls: 'iqdropdown-item-display',
          controlsCls: 'iqdropdown-item-controls',
          counterCls: 'counter'
        },
        // fires when an item quantity changes
        //onChange: (id, count, totalItems) => {},
        // return false to prevent an item decrement
       // beforeDecrement: (id, itemCount) => {},
        // return false to prevent an item increment
        //beforeIncrement: (id, itemCount) => {}       
     });
  });