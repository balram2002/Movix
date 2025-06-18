import React, { useState } from 'react';
import { List, Grid3X3, ChevronDown } from 'lucide-react';

const episodes= [
  {
    id: 1,
    title: "Pilot",
    episode: "EP-3",
    date: "Apr 13, 2025",
    duration: "48m",
    thumbnail: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 2,
    title: "Rat Trap",
    episode: "EP-4",
    date: "Apr 20, 2025",
    duration: "42m",
    thumbnail: "https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 3,
    title: "Funeral for a Friend",
    episode: "EP-5",
    date: "Apr 27, 2025",
    duration: "42m",
    thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 4,
    title: "Antwerp Blues",
    episode: "EP-6",
    date: "May 4, 2025",
    duration: "43m",
    thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 5,
    title: "The Crossroads",
    episode: "EP-7",
    date: "May 11, 2025",
    duration: "41m",
    thumbnail: "https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 6,
    title: "Helter Skelter",
    episode: "EP-8",
    date: "May 18, 2025",
    duration: "45m",
    thumbnail: "https://images.pexels.com/photos/1699420/pexels-photo-1699420.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 7,
    title: "The Beast in Me",
    episode: "EP-10",
    date: "Jun 1, 2025",
    duration: "55m",
    thumbnail: "https://images.pexels.com/photos/2272853/pexels-photo-2272853.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 8,
    title: "Final Hour",
    episode: "EP-11",
    date: "Jun 8, 2025",
    duration: "52m",
    thumbnail: "https://images.pexels.com/photos/1699420/pexels-photo-1699420.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 9,
    title: "Redemption",
    episode: "EP-12",
    date: "Jun 15, 2025",
    duration: "47m",
    thumbnail: "https://images.pexels.com/photos/2272853/pexels-photo-2272853.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  },
  {
    id: 10,
    title: "New Beginning",
    episode: "EP-13",
    date: "Jun 22, 2025",
    duration: "50m",
    thumbnail: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=85&fit=crop"
  }
];

const seasons = [1, 2, 3, 4, 5];

const EpisodeList = () => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [viewMode, setViewMode] = useState('list');

  const renderListView = () => (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <div 
          key={episode.id} 
          className="flex gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
        >
          <img 
            src={episode.thumbnail} 
            alt={episode.title}
            className="w-16 h-9 object-cover rounded flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm truncate mb-1">{episode.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{episode.episode}</span>
              <span>•</span>
              <span>{episode.date}</span>
              <span>•</span>
              <span>{episode.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {episodes.map((episode) => (
        <div 
          key={episode.id}
          className="aspect-square bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer border border-gray-700/50 hover:border-gray-600/50 flex items-center justify-center group"
        >
          <div className="text-center">
            <div className="text-white font-bold text-lg group-hover:text-purple-400 transition-colors">
              {episode.id}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {episode.episode}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-800/50 lg:rounded-lg p-4 lg:p-6">
      {/* Mobile Season Selector - Dropdown */}
      <div className="block lg:hidden mb-4">
        <div className="relative">
          <select 
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 appearance-none cursor-pointer w-full pr-10"
          >
            {seasons.map((season) => (
              <option key={season} value={season}>Season {season}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Desktop Season Selector - Horizontal Pills */}
      <div className="hidden lg:block mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-700 pb-2">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedSeason === season
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Season {season}
            </button>
          ))}
        </div>
      </div>
      
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">List of episodes (10)</h3>
        
        {/* View Mode Toggle */}
        <div className="flex bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Episode List/Grid with Proper Spacing */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-700">
        {viewMode === 'list' ? renderListView() : renderGridView()}
      </div>
    </div>
  );
};

export default EpisodeList;