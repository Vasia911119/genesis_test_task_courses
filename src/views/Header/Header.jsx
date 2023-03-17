const Header = ({ title }) => {
  return (
    <header className="w-full rounded bg-gradient-to-b from-teal-900 to-blue-900">
      <h1 className="text-center p-4 font-bold uppercase text-xl md:text-2xl text-blue-200">
        {title}
      </h1>
    </header>
  );
};

export default Header;
