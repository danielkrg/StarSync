import { useState, useEffect} from 'react';

export default function useMobile() {
    const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  
    useEffect(() => {
        const handleResize = () => {
        setMobile(window.innerWidth < 768);
        };
    
        window.addEventListener("resize", handleResize);
    
        // Clean up on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return mobile;
}