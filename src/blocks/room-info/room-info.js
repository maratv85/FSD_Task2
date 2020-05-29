
class RoomInfo {
  constructor(elem, periodDeclensionArr) {
    this.element = elem;
    this.periodDeclensionArr = periodDeclensionArr;
    this.roomPrice = parseFloat(this.element.querySelector('.js-room-info__room-price').textContent); 
    this.dayCount = parseFloat(this.element.querySelector('.js-room-info__day-count').textContent);
    this.serviceFee = parseFloat(this.element.querySelector('.js-room-info__service-fee').textContent);
    this.discount = parseFloat(this.element.querySelector('.js-room-info__number-discount').textContent);
    this.additioanlServiceFee = parseFloat(this.element.querySelector('.js-room-info__additioanl-service-fee').textContent);
    this.executeMethods();
  }

  executeMethods() {
    this.setDay();
    this.setMoneyFormat();
  }

  setMoneyFormat() {
    this.element.querySelector('.js-room-info__room-price').textContent = Number(this.roomPrice).toLocaleString('ru-RU');
    this.element.querySelector('.js-room-info__number-discount').textContent = Number(this.discount).toLocaleString('ru-RU');
    this.element.querySelector('.js-room-info__service-fee').textContent = Number(this.serviceFee).toLocaleString('ru-RU');
    this.element.querySelector('.js-room-info__additioanl-service-fee').textContent = Number(this.additioanlServiceFee).toLocaleString('ru-RU');

    this.element.querySelector('.js-room-info__final-price').textContent = Number(this._calcFinalPrice()).toLocaleString('ru-RU');
    this.element.querySelector('.js-room-info__total-room-price').textContent = Number(this._calcTotalRoomPrice()).toLocaleString('ru-RU');
  }

  setDay() {
    this.day = this._dayDeclension(this.dayCount); 
    this.element.querySelector('.js-room-info__per-day').textContent = this.day;
  }

  _calcTotalRoomPrice() {
    this.totalRoomPrice = Number(this.dayCount)*Number(this.roomPrice); 
    return this.totalRoomPrice; 
  } 
  
  _dayDeclension(num) {
    let number = Number(num);
    const cases = [2, 0, 1, 1, 1, 2];  
    return this.periodDeclensionArr[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 <5 ) ? number % 10 : 5] ];
  }

  _calcFinalPrice() {
    this.finalPrice = this._calcTotalRoomPrice() - this.discount + this.additioanlServiceFee;
    return this.finalPrice; 
  }  
}

export default RoomInfo;

document.addEventListener('DOMContentLoaded', () => {
  const declensionArr = ['сутки', 'суток', 'суток']
  const roomInfo = document.querySelectorAll('.js-room-info');
  roomInfo.forEach((val) => new RoomInfo(val, declensionArr));
});