import { useContext, useEffect, useCallback } from "react";
import { RequestContext, RequestContextType } from "../contexts";

const useRequest = (request: () => Promise<void>, usePreloader: boolean = true) => {
    const { setError, setIsLoading } = useContext(RequestContext) as RequestContextType;

    const doRequest = useCallback(async () => {
        if (usePreloader) {
            setIsLoading(true);
        }
        await request();
    }, [setIsLoading, request, usePreloader])

    useEffect(() => {
        doRequest()
            .catch(_ => setError("Request error. Try again later"))
            .finally(() => setIsLoading(false));
    }, [doRequest, setError, setIsLoading]);
}

export default useRequest;