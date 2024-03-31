export const api = async <T>(methodType: string, url: string, data: any): Promise<T> => {
    const token = localStorage.getItem('accessToken');
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