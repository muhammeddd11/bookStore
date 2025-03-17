import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  
  useEffect(function(){
    async function getBook(){
      try{
        setIsLoading(true);
        const resp = await axios.get(`http://localhost:3000/book/${id}`);
        setTitle(resp.data.book.title)
        setAuthor(resp.data.book.author)
        setPublishYear(resp.data.book.publishYear)
      }catch(err){
        console.log(err)
      }finally{
        setIsLoading(false)
      }
    }
    getBook();
  },[id])

  async function handleSave() {
    const data = {
      title,
      author,
      publishYear,
    };
    try {
      setIsLoading(true);
      await axios.patch(`http://localhost:3000/book/${id}`, data);
      navigate("/");
    } catch (error) {
      alert("Failed to Edit a new book. Please try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {isLoading ? <Spinner /> : null}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] mx-auto p-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-sky-300 p-2 m-8"
        >
          Save Book
        </button>
      </div>
    </div>
  );
}

export default EditBook;