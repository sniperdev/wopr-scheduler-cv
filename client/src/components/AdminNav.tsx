import { User } from "../interfaces/User";
import { AiOutlineAlignLeft } from "react-icons/ai";

interface props {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminNav({ user, setOpen, open }: props) {
  return (
    <nav className="flex w-full justify-between p-2 mb-10">
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 p-3 mx-4 bg-green-500 rounded-full text-white hover:bg-green-700"
      >
        <AiOutlineAlignLeft />
      </div>
      <div className="shadow-lg w-40 p-2 rounded-2xl text-center">
        {`${user.IMIE} ${user.NAZWISKO}`}
      </div>
    </nav>
  );
}

export default AdminNav;
