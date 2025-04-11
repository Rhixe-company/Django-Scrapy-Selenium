export default () => ({
  slides: [],
  intervalTime: 0,
  currentSlideIndex: 1,
  isPaused: false,
  autoplayInterval: null,
  previous() {
    if (this.currentSlideIndex > 1) {
      this.currentSlideIndex = this.currentSlideIndex - 1;
    } else {
      // If it's the first slide, go to the last slide
      this.currentSlideIndex = this.slides.length;
    }
  },
  next() {
    if (this.currentSlideIndex < this.slides.length) {
      this.currentSlideIndex = this.currentSlideIndex + 1;
    } else {
      // If it's the last slide, go to the first slide
      this.currentSlideIndex = 1;
    }
  },
  autoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayIntervalTime);
  },
  // Updates interval time
  setAutoplayIntervalTime(newIntervalTime) {
    clearInterval(this.autoplayInterval);
    this.autoplayIntervalTime = newIntervalTime;
    this.autoplay();
  },
});
