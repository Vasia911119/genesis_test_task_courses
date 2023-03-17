const Footer = () => {
  return (
    <footer className="mt-auto w-full rounded bg-gradient-to-b from-teal-900 to-blue-900 flex justify-center text-blue-200 p-4">
      <span className="pr-1">&copy;</span>
      <span>{new Date().getFullYear()}</span>
      <p className="pl-1">COURSES</p>
    </footer>
  );
};

export default Footer;
