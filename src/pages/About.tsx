import { useState } from 'react';
import { Link } from 'react-router-dom';

import { backgroundVideoUrl } from '../constants/youtube_urls';
import CustomPopup from '../components/CustomPopup';
import DriveImageFetcher from '../components/DriveImageFetcher';

import '../styles/About.css';

const About = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="relative h-full w-screen overflow-hidden">

        {/* Top-left Go to Home Link */}
        <Link
          to="/"
          className="absolute top-4 left-4 z-20 bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-white transition flex items-center gap-2"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7m-7 7v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v5m0 0l7-7m-7 7h10" />
            </svg>
          </div>
          <div>
            Home
          </div>
        </Link>

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

        <div className="marquee-container absolute bottom-0 left-0 w-full z-10">
          <p className="marquee-text">
            © Background Video by Jacob + Katie Schwarz — used for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
