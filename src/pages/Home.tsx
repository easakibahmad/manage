import { useState } from 'react';

import { backgroundVideoUrl } from '../constants/youtube_urls';
import CustomPopup from '../components/CustomPopup';
import DriveImageFetcher from '../components/DriveImageFetcher';

import '../styles/Home.css'

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     <div className='h-screen w-screen relative overflow-hidden'>
        <iframe
          src={backgroundVideoUrl.HOME}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-[100vw] h-[100vh] scale-[1.2] absolute top-0 left-0 pointer-events-none overflow-hidden"
        />
        <div className="absolute top-4 left-4 flex space-x-4 z-10">
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-white/80 hover:bg-white rounded-lg shadow text-sm font-medium cursor-pointer">
            A
          </button>
          <button className="px-4 py-2 bg-white/80 hover:bg-white rounded-lg shadow text-sm font-medium cursor-pointer">
            B
          </button>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow text-sm font-medium cursor-pointer">
            C
          </button>
        </div>
        
        <CustomPopup isOpen={showModal} onClose={() => setShowModal(false)}>
          <DriveImageFetcher
            folderId={import.meta.env.VITE_FOLDER_ID} 
            apiKey={import.meta.env.VITE_DRIVE_API_KEY}
          />
        </CustomPopup>

        <div className="marquee-container absolute bottom-0 left-0 w-full z-[1001]">
          <p className="marquee-text">  © Background Video by Jacob + Katie Schwarz — used for demonstration purposes only.</p>
        </div>
      </div>
    </>
  )
}

export default Home