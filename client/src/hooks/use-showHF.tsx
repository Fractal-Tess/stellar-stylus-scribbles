import { useLocation } from 'react-router-dom';

export function useShowHF() {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login', '/signup', '/register'];
  return !hideHeaderFooterPaths.includes(location.pathname);
}
