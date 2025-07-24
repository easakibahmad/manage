import { useState } from 'react';

import { backgroundVideoUrl } from '../constants/youtube_urls';
import CustomPopup from '../components/CustomPopup';
import DriveImageFetcher from '../components/DriveImageFetcher';

import '../styles/Home.css'

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     <div className='relative h-full w-screen overflow-hidden'>
        <iframe
          src={backgroundVideoUrl.HOME}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full absolute top-0 left-0 pointer-events-none overflow-hidden"
        />
        
        <CustomPopup isOpen={showModal} onClose={() => setShowModal(false)}>
          <DriveImageFetcher
            folderId={import.meta.env.VITE_FOLDER_ID} 
            apiKey={import.meta.env.VITE_DRIVE_API_KEY}
          />
        </CustomPopup>

        <div className="marquee-container absolute bottom-14 left-0 w-full z-10">
          <p className="marquee-text">  © Background Video by Jacob + Katie Schwarz — used for demonstration purposes only.</p>
        </div>
      </div>
    </>
  )
}

export default Home