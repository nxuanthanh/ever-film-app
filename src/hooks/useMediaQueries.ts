import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useMediaQueryService = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const isDesktopMq = useMediaQuery({ minWidth: 1280 });
  const isTabletMq = useMediaQuery({ minWidth: 720, maxWidth: 1279 });
  const isMobileMq = useMediaQuery({ maxWidth: 719 });
  const isDesktop = useMemo(() => initialized && isDesktopMq, [initialized, isDesktopMq]);
  const isTablet = useMemo(() => initialized && isTabletMq, [initialized, isTabletMq]);
  const isMobile = useMemo(() => initialized && isMobileMq, [initialized, isMobileMq]);
  useEffect(() => {
    setInitialized(true);
  }, []);
  return {
    isDesktop,
    isTablet,
    isMobile,
  };
};
