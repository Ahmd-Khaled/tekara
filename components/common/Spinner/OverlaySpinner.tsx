import React from "react";

const OverlaySpinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-transparent flex items-center justify-center animate-fadeIn">
      <div className="w-10 h-10 border-4 primaryColor border-t-transparent rounded-full animate-spin bg-transparent" />
    </div>
  );
};

export default OverlaySpinner;
