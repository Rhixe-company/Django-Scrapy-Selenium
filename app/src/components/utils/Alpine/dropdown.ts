export default (): {
  adminopen: boolean;
  admin1open: boolean;
  useropen: boolean;
  notificationopen: boolean;
  admintoggle: () => void;
  admin1toggle: () => void;
  usertoggle: () => void;
  notificationtoggle: () => void;
} => ({
  adminopen: false,
  admin1open: false,
  useropen: false,
  notificationopen: false,

  admintoggle() {
    this.adminopen = !this.adminopen;
  },
  admin1toggle() {
    this.admin1open = !this.admin1open;
  },
  usertoggle() {
    this.useropen = !this.useropen;
  },
  notificationtoggle() {
    this.notificationopen = !this.notificationopen;
  },
});
