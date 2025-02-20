import Logo from "@/assets/svgs/logo.svg?react";
import { NAVBAR_TITLE_1, NAVBAR_TITLE_2 } from "@/constants/text";

const NavBar = () => {
  return (
    <nav>
      <div className="flex items-center gap-2 pl-40 bg-grey h-6">
        <Logo />
        <p className="font-sanspro text-secondary text-xxs">
          <span>{NAVBAR_TITLE_1}</span>
          <span className="font-semibold">{NAVBAR_TITLE_2}</span>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
