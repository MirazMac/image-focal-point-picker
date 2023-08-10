import {inNumber, insideContainment, inPercent} from "./utils.js";

export default class ImageFocalPointPicker {

  /**
   * If pointer is down
   *
   * @type {Boolean}
   */
  isDown = false;

  /**
   *
   * @type {Object}
   */
  imageRect = {};

  constructor(
    imageElement,
    position = {x: 50, y: 50},
    callback = () => {
    }) {
    this.image = imageElement;

    // Insert the dot
    const dot = document.createElement('span');
    dot.className = 'dot';
    this.image.insertAdjacentElement('beforebegin', dot);

    this.dot = dot;
    this.position = position;

    this.changeCallback = callback;

    this._handleImageDown = this.handleImageDown.bind(this);
    this._handleImageUp = this.handleImageUp.bind(this);
    this._handleDotMove = this.handleDotMove.bind(this);
    this._handleWindowResize = this.handleWindowResize.bind(this);

    this._init();

    this.image.ImageFocalPointPicker = this;

    return this;
  }

  static getOrCreateInstance(
    imageElement,
    position = {x: 50, y: 50},
    callback = () => {
    }) {
    if (imageElement['ImageFocalPointPicker']) {
      return imageElement['ImageFocalPointPicker'];
    }

    return new ImageFocalPointPicker(imageElement, position, callback);
  }

  _updateImageRect() {
    this.imageRect = this.image.getBoundingClientRect();
  }

  _updateDot() {
    this.dot.style.left = (inNumber(this.position.x, this.imageRect.width) - (this.dot.offsetWidth / 2)) + 'px';
    this.dot.style.top = (inNumber(this.position.y, this.imageRect.height) - (this.dot.offsetHeight / 2)) + 'px';
  }

  _init() {
    this._updateImageRect();
    this._updateDot();

    window.addEventListener('resize', this._handleWindowResize, true);
    document.addEventListener('pointerup', this._handleImageUp, true);
    document.addEventListener('pointermove', this._handleDotMove, true);
    document.addEventListener('pointerdown', this._handleImageDown, true);
  }

  destroy() {
    window.removeEventListener('resize', this._handleWindowResize, true);
    document.removeEventListener('pointerup', this._handleImageUp, true);
    document.removeEventListener('pointermove', this._handleDotMove, true);
    document.removeEventListener('pointerdown', this._handleImageDown, true);
  }

  handleDotMove(event) {
    if (!this.isDown) {
      return;
    }

    this._updatePosition(event);
    this._updateDot();
    this.changeCallback(this.position);
  }

  handleImageUp() {
    this.isDown = false;
  }

  /**
   *
   * @param event {PointerEvent}
   * @private
   */
  _updatePosition(event) {
    const x = Math.round(inPercent(event.clientX - this.imageRect.x, this.imageRect.width));
    const y = Math.round(inPercent(event.clientY - this.imageRect.y, this.imageRect.height));

    if (x <= 0) {
      this.position.x = 0;
    } else if (x >= 100) {
      this.position.x = 100;
    } else {
      this.position.x = x;
    }

    if (y <= 0) {
      this.position.y = 0;
    } else if (y >= 100) {
      this.position.y = 100;
    } else {
      this.position.y = y;
    }
  }

  handleImageDown(event) {
    if (!this._isInsideImage(event)) {
      return;
    }
    
    this.isDown = true;

    this._updatePosition(event);
    this._updateDot();
    this.changeCallback(this.position);
  }

  /**
   * Checks if the pointer is within the bounds of the image or not
   *
   * @param event {PointerEvent}
   * @returns {Boolean}
   * @private
   */
  _isInsideImage(event) {
    return insideContainment(event.clientX, event.clientY, this.imageRect);
  }

  handleWindowResize() {
    this._updateImageRect();
    this._updateDot();
    this.changeCallback(this.position);
  }
}
