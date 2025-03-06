import React from 'react';
import { Code2 } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Mind vs Machine Tic Tac Toe. All rights reserved.
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <Code2 className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            Created by <span className="text-blue-600 dark:text-blue-400 font-medium">Masab Qurban</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;