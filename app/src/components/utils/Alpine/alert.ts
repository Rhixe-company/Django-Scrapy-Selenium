export default (): {
  alertIsVisible: boolean;

  toggle: () => void;
} => ({
  alertIsVisible: true,

  toggle() {
    this.alertIsVisible = false;
  },
});
