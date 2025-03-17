import {useParams,useNavigate} from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useState } from "react";
function DeleteBook() {
  const [loading,setLoading] = useState(false)
  const {id} = useParams();
  const navigate = useNavigate();

  async function handleDelete(){
    try{setLoading(true);
    await axios.delete(`http://localhost:3000/book/${id}`)
    navigate("/")}catch(err){
      console.log(err)
      alert("Something went wrong")
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDelete}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;