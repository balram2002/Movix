import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import EpisodeList from './components/EpisodeList';
import PlayerControls from './components/PlayerControls';
import ShowDetails from './components/ShowDetails';

function StreamPage() {
  return (
    <div className="min-h-screen bg-gray-900" style={{ backgroundColor: '#0f0f23' }}>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Mobile: Player Section */}
        <div className="h-screen flex flex-col">
          <div className="flex-1 p-4">
            <VideoPlayer />
          </div>
          <div className="flex-shrink-0 px-4 pb-4">
            <PlayerControls />
          </div>
        </div>
        
        {/* Mobile: Episodes Section */}
        <div className="min-h-screen">
          <EpisodeList />
        </div>
        
        {/* Mobile: Show Details */}
        <div className="p-4">
          <ShowDetails />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Desktop: Main Content - Full Viewport Height */}
        <div className="h-screen flex">
          {/* Left side - Video Player and Controls */}
          <div className="flex-1 flex flex-col p-6">
            {/* Video Player - Takes available space */}
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <VideoPlayer />
            </div>
            
            {/* Player Controls - Fixed at bottom of viewport */}
            <div className="flex-shrink-0 mt-6">
              <PlayerControls />
            </div>
          </div>
          
          {/* Right side - Episode List */}
          <div className="w-80 flex-shrink-0">
            <EpisodeList />
          </div>
        </div>
        
        {/* Desktop: Show Details Section - Below the main content */}
        <div className="px-6 pb-6">
          <ShowDetails />
        </div>
      </div>
    </div>
  );
}

export default StreamPage;