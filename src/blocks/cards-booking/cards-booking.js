class CardsBooking {
  constructor(element) {
    this.element = element;
    this.setPriceFormat();
  }

  setPriceFormat() {
    this.price = this.element.querySelector('.js-cards-booking__price-room').textContent;
    this.money = Number(this.price);
    this.element.querySelector('.js-cards-booking__price-room').textContent = this.money.toLocaleString('ru-RU');
  }
}

export default CardsBooking;

document.addEventListener('DOMContentLoaded', () => {
  const roomPrice = document.querySelectorAll('.js-cards-booking');
  roomPrice.forEach((val) => new CardsBooking(val));
});
