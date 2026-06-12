import { LuPencil, LuEraser } from 'react-icons';
export default function ToolBar({ pencilOnClick, eraserOnClick }) {
  return (
    <div className="toolbarContainer">
      <button onClick={pencilOnClick}>
        <LuPencil size={24} color="#333333" />
      </button>
      <button onClick={eraserOnClick}>
        <LuEraser size={24} color="#222222" />
      </button>
    </div>
  );
}
