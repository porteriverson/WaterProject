import { useState } from 'react';
import WelcomeBand from '../components/WelcomeBand';
import CategoryFilter from '../components/CategoryFilter';
import CookieConsent from 'react-cookie-consent';
import Fingerprint from '../components/Fingerprint';
import ProjectList from '../components/ProjectList';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container">
      <CartSummary />
      <WelcomeBand />
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
  );
}

export default ProjectsPage;
