import React from 'react';
import { ImageIcon } from 'lucide-react';

const VideoPlayer= () => {
  return (
    <div className="w-full bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
      <ImageIcon className="w-16 h-16 text-gray-400" />
    </div>
  );
};

export default VideoPlayer;