import React from "react";
import "./styles.css";

const Modal = ({ handleClose, show, children, handleSave }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main rounded-lg">
        {children}
        <div className="flex justify-end mb-5 mt-5 mr-5">
          <button
            className="bg-red-900 rounded mr-5 text-white px-3 py-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 rounded mr-5 text-gray-700 px-3 py-2"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
