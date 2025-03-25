import ProjectList from './ProjectList';
import './App.css';
import CookieConsent from 'react-cookie-consent';
import Fingerprint from './Fingerprint';
import CategoryFilter from './CategoryFilter';
import WelcomeBand from './WelcomeBand';
import { useState } from 'react';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <div className="container">
        <div className="row bg-primary text-white">
          <WelcomeBand />
        </div>
        <div className="row">
          <div className="col-md-4">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-8">
            <ProjectList selectedCategories={selectedCategories} />
          </div>
        </div>

        <CookieConsent>
          This app uses cookies to track you maliciously
        </CookieConsent>
        <Fingerprint />
      </div>
    </>
  );
}

export default App;
