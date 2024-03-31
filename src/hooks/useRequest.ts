import { useContext, useEffect } from "react";
import { RequestContext, RequestContextType } from "../contexts";

const useRequest = (request: () => Promise<void>, usePreloader: boolean = true) => {
    const { setError, setIsLoading } = useContext(RequestContext) as RequestContextType;

    useEffect(() => {
        const doRequest = async () => {
            if (usePreloader) {
                setIsLoading(true);
            }
            await request();
        }

        doRequest()
            .catch(_ => setError("Request error"))
            .then(_ => setIsLoading(false));
    }, [request, setError, setIsLoading]);
}

export default useRequest;