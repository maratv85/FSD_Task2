class LikeButton {
  constructor(elem) {
    this.like = elem;
    this.initLike();
  }

  initLike() {
    this.findDOMElements();
    this.setLikeStatus();
    this.bindEventListener();
  }

  findDOMElements() {
    this.icon = this.like.querySelector('.js-like-button__icon');
    this.likeCount = this.like.querySelector('.js-like-button__text-number');
    this.isLiked = this.like.dataset.isliked;
  }

  setLikeStatus() {
    if (this.isLiked === 'false') {
      this._setUnliked();
    } else if (this.isLiked === 'true') {
      this._setLiked();
    }
  }

  bindEventListener() {
    this.like.addEventListener('click', this._handleButtonClick.bind(this));
  }

  _handleButtonClick() {
    this.like.classList.toggle('like-button_liked');
    if (this.like.classList.contains('like-button_liked')) {
      this._setLiked();
      this.likeCount.textContent = Number(this.likeCount.textContent) + 1;
    } else {
      this._setUnliked();
      if (Number(this.likeCount.textContent) >= 0) {
        this.likeCount.textContent = Number(this.likeCount.textContent) - 1;
      }
    }
  }

  _setUnliked() {
    this.newIcon = this.icon.querySelector('i');
    this.newIcon.textContent = 'favorite_border';
    this.newIcon.classList.remove('material-icons_color_purple');
    this.newIcon.classList.add('material-icons_color_dark-shade-25');
    this.like.classList.remove('like-button_liked');
    this.likeCount.classList.remove('like-button__text-number_liked');
  }

  _setLiked() {
    this.newIcon = this.icon.querySelector('i');
    this.newIcon.textContent = 'favorite';
    this.newIcon.classList.remove('material-icons_color_dark-shade-25');
    this.newIcon.classList.add('material-icons_color_purple');
    this.like.classList.add('like-button_liked');
    this.likeCount.classList.add('like-button__text-number_liked');
  }
}

export default LikeButton;

document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.js-like-button');
  likeButtons.forEach((val) => new LikeButton(val));
});
