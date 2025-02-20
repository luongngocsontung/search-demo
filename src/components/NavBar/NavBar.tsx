import Logo from "@/assets/svgs/logo.svg?react";

const NavBar = () => {
  return (
    <nav>
      <div className="flex items-center gap-2 pl-40 bg-grey h-6">
        <Logo />
        <p className="font-sanspro text-secondary">
          <span>An Official Website of the </span>
          <span className="font-semibold">Singapore Government</span>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
