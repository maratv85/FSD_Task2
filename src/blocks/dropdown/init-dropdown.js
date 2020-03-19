import Dropdown from './dropdown';


document.addEventListener('DOMContentLoaded', () => {
  const optionCases = {
    гости: ['гость', 'гостя', 'гостей'],
    младенцы: ['младенец', 'младенца', 'младенцев'],
    спальни: ['спальня, ', 'спальни, ', 'спален, '],
    кровати: ['кровать, ', 'кровати, ', 'кроватей, '],
    'ванные комнаты': ['ванная комната ', 'ванные комнаты ', 'ванных комнат '],
  };

  const dropdownGuests = document.querySelectorAll('.js-dropdown');
  dropdownGuests.forEach((val) => new Dropdown(val, optionCases));
});
