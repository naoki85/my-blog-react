import React, {useEffect} from "react";

const ScrollToTopOnMount: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  });

  return null;
};

export default ScrollToTopOnMount;
