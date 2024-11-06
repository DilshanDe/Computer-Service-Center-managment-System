import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <a href="https://web.facebook.com/profile.php?id=61565421770878" className="text-white"><FaFacebook size={24} /></a>
            <a href="#instagram" className="text-white"><FaInstagram size={24} /></a>
            <a href="https://www.youtube.com/channel/UCuN6CfWg3330fkimyqEq1jA" className="text-white"><FaYoutube size={24} /></a>
          </div>
          <p className="text-center text-sm">
            Copyright© 2024 All Rights Reserved by Beez Computer Service
          </p>
        </div>
      </footer>

      
    </div>
  );
}

export default Footer;
