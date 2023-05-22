import "../../style/style_pagination.css";
import {GrFormNext} from 'react-icons/gr';
import {GrFormPrevious} from 'react-icons/gr';
export default function Pagination(props) {


    return (
<div className=" py-6">
  <div className="flex items-center space-x-4">
    <button
      onClick={props.prevHandler}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-500 cursor-pointer transition duration-200"
    >
      <GrFormPrevious />
    </button>

    <div className="flex items-center ">
      <span className="w-10 h-10 rounded-full bg-yellow-300 text-black flex items-center justify-center cursor-pointer">
        {props.currentPage}
      </span>

      <span className="w-10 h-10 rounded-full bg-white text-black border border-yellow-300 flex items-center justify-center cursor-pointer hover:bg-yellow-100 transition duration-200">
        {props.currentPage+1}
      </span>
    </div>

    <button
      onClick={props.nextHandler}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 active:bg-yellow-500 cursor-pointer transition duration-200"
    >
      <GrFormNext />
    </button>
  </div>
</div>

    )
  }