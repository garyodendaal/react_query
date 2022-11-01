import { Dispatch, SetStateAction } from "react";

interface OwnProps {
  setPage: Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<OwnProps> = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>Planets</button>
      <button onClick={() => setPage("people")}>People</button>
    </nav>
  );
};

export default Navbar;
