const Scroll = require("react-scroll");
const scroll = Scroll.animateScroll;
export const scrollTop = () =>
  scroll.scrollToTop({ smooth: true, hashSpy: true });
