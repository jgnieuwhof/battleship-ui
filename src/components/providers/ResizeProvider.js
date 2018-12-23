import React, { useEffect, useState } from 'react';

const ResizeProvider = ({ render }) => {
  const [dimensions, setDimensions] = useState([]);

  const updateDimensions = () =>
    setDimensions([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return render({ dimensions });
};

export const withResize = Component => props => (
  <ResizeProvider
    render={({ dimensions }) => <Component {...{ dimensions }} {...props} />}
  />
);

export default ResizeProvider;
