import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function ShowBook() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        setError(null); 
        const response = await axios.get(`http://localhost:3000/book/${id}`);
        setBook(response.data.book); // Assuming response.data has _id, title, etc.
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to load book details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [id]);

  console.log("Book data:", book);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : book ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
        </div>
      ) : (
        <div>No book data available.</div>
      )}
    </div>
  );
}

export default ShowBook;