import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PlayerControls= () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex gap-2">
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors">
          Server 1
        </button>
        <button className="bg-gray-600 text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500 transition-colors">
          Server 2
        </button>
      </div>
      
      <div className="flex gap-2">
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;