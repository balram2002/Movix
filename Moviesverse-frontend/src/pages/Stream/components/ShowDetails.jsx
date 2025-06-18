import React from 'react';
import { Tag } from 'lucide-react';

const tags = [
  'london, england', 'gang war', 'family business',
  'betrayal', 'crime family', 'fixer',
  'gangsters', 'excited'
];

const ShowDetails = () => {
  return (
    <div className="mt-8">
      {/* Main Details Section - Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Left Section - Show Info */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <img 
              src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop"
              alt="MobLand poster"
              className="w-48 h-72 object-cover rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
              }}
            />
            <div className="mt-4 text-center">
              <div className="text-red-500 font-bold text-2xl tracking-wider">
                MOBLAND
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left" style={{ padding: '1rem 0' }}>
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">MobLand</h1>
            <div className="text-gray-400 mb-2">Crime, Drama</div>
            <div className="text-gray-400 text-sm mb-2">Jun 17, 2025 • 60m</div>
            <div className="text-gray-400 text-sm mb-6">seasons: 1 • episodes: 10</div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Two mob families clash in a war that threatens to topple empires and lives
            </p>
          </div>
        </div>
        
        {/* Right Section - Tags */}
        <div className="flex flex-col justify-start" style={{ padding: '1rem 0' }}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4 justify-center xl:justify-start">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center xl:justify-start">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors cursor-pointer border border-gray-600/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar TV Shows Section */}
      <div className="border-t border-gray-700/50 pt-8">
        <h2 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left">Similar TV Shows</h2>
      </div>
    </div>
  );
};

export default ShowDetails;