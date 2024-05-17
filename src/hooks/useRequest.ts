import { useContext, useEffect, useCallback } from "react";
import { RequestContext, RequestContextType } from "../contexts";

const useRequest = (request: () => Promise<void>) => {
    const { setError, setIsLoading } = useContext(RequestContext) as RequestContextType;

    const doRequest = useCallback(async () => {
        setIsLoading(true);
        await request();
    }, [setIsLoading, request])

    useEffect(() => {
        doRequest()
            .catch(_ => setError("Request error. Try again later"))
            .finally(() => setIsLoading(false));
    }, [doRequest, setError, setIsLoading]);
}

export default useRequest;