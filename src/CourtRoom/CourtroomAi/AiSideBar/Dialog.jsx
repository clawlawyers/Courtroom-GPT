const Dialog = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm z-30 overflow-auto">
      <div className="relative bg-gradient-to-r from-gray-900 to-teal-600 rounded-md w-2/3 h-[90%] border-2 border-white">
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}>
          <Close className="text-white" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
