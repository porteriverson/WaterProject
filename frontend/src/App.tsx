import ProjectList from './ProjectList';
import './App.css';
import CookieConsent from 'react-cookie-consent';
import Fingerprint from './Fingerprint';

function App() {
  return (
    <>
      <ProjectList />
      <CookieConsent>
        This app uses cookies to track you maliciously
      </CookieConsent>
      <Fingerprint />
    </>
  );
}

export default App;
