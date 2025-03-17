import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

function BackButton({ dest = "/" }) {
  return (
    <div className="flex">
      <Link
        to={dest}
        className="bg-sky-800 text-white px-4 py-1 rounded-md w-fit flex items-center"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
}

export default BackButton;