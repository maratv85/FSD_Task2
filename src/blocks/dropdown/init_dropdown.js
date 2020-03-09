import Dropdown from './dropdown.js';

document.addEventListener('DOMContentLoaded', () => {
    const OPTIONS = {
      гости:    ['гость', 'гостя', 'гостей'],
      младенцы: ['младенец', 'младенца', 'младенцев'],
      спальни:  ['спальня, ', 'спальни, ', 'спален, '],
      кровати:  ['кровать, ', 'кровати, ', 'кроватей, '],
      'ванные комнаты': ['ванная комната ', 'ванные комнаты ', 'ванных комнат ']
    };
  
    const GUESTS = document.querySelectorAll('.dropdown');
    GUESTS.forEach( (val) => new Dropdown(val, OPTIONS));
  });