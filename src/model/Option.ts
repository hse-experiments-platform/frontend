export interface Option {
    id: string;
    value: string;
}

export const buildDefaultOptions = (items: any[]) => {
    const options: Option[] = [];
    for (const item of items) {
        options.push({
            id: item,
            value: item
        });
    }
    return options;
}