import { FaPenNib, FaEraser } from 'react-icons/fa6';

export default function ToolBar({ pencilOnClick, eraserOnClick }) {
  return (
    <div className={toolbarContainer}>
      <button type="button" className={buttonStyle} onClick={pencilOnClick}>
        <FaPenNib size={16} />
      </button>
      <button type="button" className={buttonStyle} onClick={eraserOnClick}>
        <FaEraser size={16} />
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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
