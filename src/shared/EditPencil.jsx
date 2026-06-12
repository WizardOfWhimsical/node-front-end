import { FaPencil, FaEraser } from 'react-icons/fa6';

export default function ToolBar({ pencilOnClick, eraserOnClick }) {
  return (
    <div className={toolbarContainer}>
      <button className={buttonStyle} onClick={pencilOnClick}>
        <FaPencil />
      </button>
      <button className={buttonStyle} onClick={eraserOnClick}>
        <FaEraser />
      </button>
    </div>
  );
}

const buttonStyle = {
  background: 'transparent',
  border: 'none',
  opacity: 1,
  padding: 0,
  display: 'inline-flex',
  justifyContent: 'end',
  alignItems: 'center',
  size: 18,
  cursor: 'pointer',
};

const toolbarContainer = {
  display: 'fles',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
