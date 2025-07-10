import React from 'react';
import { useRouter } from 'next/navigation';
import { IconFileCv, IconTerminal2 } from '@tabler/icons-react';

const GameNavbar = () => {
  const router = useRouter();


  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Cable */}
        <div className="absolute w-3 h-12 bg-black -mt-12 left-1/2 transform -translate-x-1/2 shadow-lg"></div>

        {/* Main Controller Body */}
        <div className="relative w-72 h-30 bg-gradient-to-br from-zinc-900 to-zinc-700 shadow-xl rounded-lg border-4 border-zinc-800">
          {/* Logo */}
          <div className="absolute bg-gray-200 rounded-sm left-1/2 transform -translate-x-1/2 top-2 w-4 h-1"></div>

          {/* Center Mode Switch Buttons */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 flex space-x-2">
            <button
              onClick={() => router.push('/professional')}
              className="w-8 h-8 bg-zinc-100 text-black rounded-full font-bold text-xs shadow-inner hover:scale-110 transition-transform"
            ><IconFileCv className="h-6 w-8 px-1"/></button>
            <button
              onClick={() => router.push('/terminal')}
              className="w-8 h-8 bg-zinc-100 text-black rounded-full font-bold text-xs shadow-inner hover:scale-110 transition-transform"
            ><IconTerminal2 className="h-6 w-7 px-1" /></button>
          </div>

          {/* Start/Select Buttons */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 bottom-3">
            <div className="w-2 h-6 bg-zinc-500 rounded-sm shadow-inner"></div>
            <div className="w-2 h-6 bg-zinc-500 rounded-sm shadow-inner"></div>
          </div>

          {/* Left D-Pad */}
          <div className="absolute w-34 h-34 rounded-full bg-zinc-800 -left-16 -top-1 border-4 border-zinc-900 shadow-inner">
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-300 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute w-3 h-3 bg-gray-300 -top-3 left-0"></div>
              <div className="absolute w-3 h-3 bg-gray-300 -bottom-3 left-0"></div>
              <div className="absolute w-3 h-3 bg-gray-300 top-0 -left-3"></div>
              <div className="absolute w-3 h-3 bg-gray-300 top-0 -right-3"></div>
            </div>

          </div>

          <div className="absolute w-34 h-34 rounded-full bg-zinc-800 -right-53 -top-1 border-4 border-zinc-900 shadow-inner flex items-center justify-center relative">
            {/* Diamond layout */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-yellow-400 border border-zinc-800 flex items-center justify-center text-white text-xs font-bold shadow">X</div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-green-600 border border-zinc-900 flex items-center justify-center text-white text-xs font-bold shadow">E</div>
            </div>
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border border-zinc-900 flex items-center justify-center text-white text-xs font-bold shadow">F</div>
            </div>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-red-700 border border-zinc-800 flex items-center justify-center text-white text-xs font-bold shadow">Y</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GameNavbar;
