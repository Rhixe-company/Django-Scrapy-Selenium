export default (): {
  useropen: boolean;
  notificationopen: boolean;
  usertoggle: () => void;
  notificationtoggle: () => void;
} => ({
  useropen: false,
  notificationopen: false,

  usertoggle() {
    this.useropen = !this.useropen;
  },
  notificationtoggle() {
    this.notificationopen = !this.notificationopen;
  },
});
