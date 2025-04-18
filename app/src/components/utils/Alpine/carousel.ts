interface CarouselData {
  slides: any[];
  intervalTime: number;
}

interface Carousel {
  slides: any[];
  autoplayIntervalTime: number;
  currentSlideIndex: number;
  isPaused: boolean;
  autoplayInterval: NodeJS.Timeout | null;
  previous: () => void;
  next: () => void;
  autoplay: () => void;
  setAutoplayIntervalTime: (newIntervalTime: number) => void;
}

export default (
  carouselData: CarouselData = {
    slides: [],
    intervalTime: 0,
  },
): Carousel => ({
  slides: carouselData.slides,
  autoplayIntervalTime: carouselData.intervalTime,
  currentSlideIndex: 1,
  isPaused: true,
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
  setAutoplayIntervalTime(newIntervalTime: number) {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.autoplayIntervalTime = newIntervalTime;
    this.autoplay();
  },
});
