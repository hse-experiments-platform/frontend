import { useEffect } from "react";
import {
    Location,
    NavigationType,
    useLocation,
    useNavigationType,
} from "react-router-dom";

const useBackListener = (callback: (...args: any) => void) => {
    const location: Location = useLocation();
    const navType: NavigationType = useNavigationType();

    useEffect(() => {
        console.log('trigger')
        if (navType === 'POP') {
            callback();
        }
    }, [location]);
};

export default useBackListener;