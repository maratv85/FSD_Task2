import 'slick-carousel';
import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';

class CardsRoomPreview {
  constructor(elem) {
    this.$elem = $(elem);
    this.hasArrows = false;
    this.findDOMElements();
    this.checkArrows(this.$carousel);
    this.carouselSettings();
  }

  findDOMElements() {
    this.$carousel = this.$elem.find('.js-cards-room-preview__carousel');
  }

  checkArrows(elemWithArrows) {
    if ($(elemWithArrows).hasClass('cards-room-preview__arrows')) {
      this.hasArrows = true;
    }
  }

  carouselSettings() {
    this.$carousel.slick({
      dots: true,
      infinite: true,
      arrows: this.hasArrows,
    });
  }
}

export default CardsRoomPreview;

$(() => {
  const $roomPreview = $('.js-cards-room-preview');
  $roomPreview.each((i, val) => {
    new CardsRoomPreview(val);
  });
});
