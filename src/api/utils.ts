export const api = async <T>(methodType: string, url: string, token: string | null, data: any): Promise<T> => {
    const response = await fetch(url, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? {'Authorization': token}: {})
        },
        body: data ? JSON.stringify(data) : null,
    });
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await (response.json() as Promise<T>)
}