import React from 'react';

interface FormSuccessMessageProps {
  title: string;
  message: string;
  showGif?: boolean; // Added showGif prop
}

const FormSuccessMessage: React.FC<FormSuccessMessageProps> = ({ title, message, showGif = true }) => { // Added showGif prop with default true
  return (
    <div className="text-center py-6 relative">
      {/* Success Content */}
      <div className="mb-4">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{message}</p>
      </div>
      
      {/* Payment GIF */}
      {showGif && (
        <div className="flex items-center justify-center">
        <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-green-200">
          <img 
            src="https://i.postimg.cc/6pvH1mJz/pay-per-click.gif" 
            alt="Payment processing"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default FormSuccessMessage;