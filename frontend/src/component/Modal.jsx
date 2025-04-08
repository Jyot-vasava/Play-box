// Functional component for rendering a modal
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && ( // Render modal only if 'isOpen' prop is true
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          {/* Background overlay with opacity */}
          <div className="absolute top-[40%] left-[20%] bg-white p-4 rounded-lg z-10 text-right">
            <button
              className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
              onClick={onClose} // Close button with onClick handler
            >
              X
            </button>
            {children} {/* Render any children passed to the modal */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
