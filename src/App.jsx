import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import './App.css';

function App() {
  return (
    <div className="flex flex-col items-center bg-orange-200">
      <div className="flex flex-row gap-20 text-sm pt-10   font-bold">
        <p>BIO</p>
        <p>PORTFOLIO</p>
        <p>POSTCAST</p>
        <p>BLOG</p>
      </div>
      <div className="flex flex-row border mt-10 mb-10 border-black w-[700px]">
        <div className="flex flex-col w-full">
          <div className="text-left pl-6 pt-8">
            <p className="text-5xl pb-3">Bethany Jones</p>
            <p>Im a dedicated culture critic and blogger</p>
            <p>located in San Francisco, California.</p>
          </div>
          <div className='pt-20'>
            <p className=" text-left pl-6 text-gray-700">@reallygreatsite</p>
            <div className="flex gap-4 pl-6 pt-2 pb-10">
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
            </div>
          </div>
        </div>
        <div>
          <img src="/img/image.png" alt="Bethany Jones" className="w-[500px] h-full p-3" />
        </div>
      </div>
    </div>
  );
}

export default App;
