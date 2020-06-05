import 'slick-carousel';
import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';

class CardsRoomPreview {
  constructor(elem) {
    this.$elem = $(elem);
    this.findDOMElements();
    this.carouselSettings();
  }

  findDOMElements() {
    this.$carousel = this.$elem.find('.js-cards-room-preview__carousel');
  }

  carouselSettings() {
    this.$carousel.slick({
      dots: true,
      infinite: true,
      arrows: true,
    })
  }
}

export default CardsRoomPreview;

$(() => {
 const $roomPreview = $('.js-cards-room-preview');
 $roomPreview.each((i, val) => {
   new CardsRoomPreview(val);
 });
});