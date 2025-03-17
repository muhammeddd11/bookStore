import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineAddBox } from "react-icons/md";

function Home() {
  const [books, setBooks] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function() {
    async function getBooks() {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/book");
        setBooks(response.data.books); 
      } catch(err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getBooks();
  }, []);
  return (<div className="p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl my-8">Book List</h1>
      <Link to="/book/create">
        <MdOutlineAddBox className="text-sky-800 text-4xl"/>
      </Link>
    </div>
    {isLoading?<Spinner/>:<table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
          <th className="border border-slate-600 rounded-md ">Operations</th>

        </tr>
      </thead>
      <tbody>
        {books.map((book,i)=>{
          return <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">{i+1}</td>
            <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.publishYear}</td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/book/details/${book._id}`}>
                  <BsInfoCircle className="text-green-800 text-2xl"/>
                </Link>
                <Link to={`/book/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600"/>
                </Link>
                <Link to={`/book/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600"/>
                </Link>
              </div>
            </td>
          </tr>
        })}
      </tbody>
      </table>}
  </div>);
}

export default Home;