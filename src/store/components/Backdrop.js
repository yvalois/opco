import "./Backdrop.css";

const Backdrop = ({ click, show }) => {
  return show && <div className="w-full h-full bg-black-400 z-10 fixed top-0 left-0" onClick={click}></div>;
};

export default Backdrop;
