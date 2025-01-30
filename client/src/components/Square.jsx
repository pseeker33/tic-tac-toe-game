export const Square = ({ children, index, updateBoard, isSelected, isComputerThinking }) => {
  
  const className = `square ${isSelected ? 'is-selected' : ''} ${isComputerThinking ? 'disabled' : ''}`
  
  const handleClick = () => {
    if (typeof updateBoard === 'function' && !isComputerThinking) {
      updateBoard(index);
    }
  };
  

  return  (
    <div 
      onClick={handleClick}
      className={className}
      style={isComputerThinking ? { cursor: 'not-allowed' } : {}}
    >
      {children}
    </div>
  )
}