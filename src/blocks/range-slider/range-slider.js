import 'ion-rangeslider/js/ion.rangeSlider.min';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';

class RangeSlider {
  constructor(slider) {
    this.$sliderContainer = $(slider);
    this.findDOMElements();
    this.initSlider();
  }

  findDOMElements() {
    this.$slider = this.$sliderContainer.find('.js-range-slider__slider');
    this.$priceRange = this.$sliderContainer.find('.js-range-slider__price-range');
  }

  initSlider() {
    const { $priceRange } = this;
    this.$slider.ionRangeSlider({
      type: 'double',
      min: 550,
      max: 15400,
      step: 100,
      from: 5000,
      to: 10000,
      hide_min_max: true,
      hide_from_to: true,
      prettify_enabled: true,
      prettify_separator: ' ',
      onStart(data) {
        const { from, to } = data;
        $priceRange.val(`${new Intl.NumberFormat('ru-RU').format(from)}₽ - ${new Intl.NumberFormat('ru-RU').format(to)}₽`);
      },
      onChange(data) {
        const { from, to } = data;
        $priceRange.val(`${new Intl.NumberFormat('ru-RU').format(from)}₽ - ${new Intl.NumberFormat('ru-RU').format(to)}₽`);
      },
    });
  }
}

export default RangeSlider;


$(() => {
  const $sliders = $('.js-range-slider');
  $sliders.each((index, val) => {
    new RangeSlider(val);
  });
});
