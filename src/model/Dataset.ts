class Dataset {
    id: number;
    name: string;
    version: string;
    status: string;

    constructor(id: number, name: string, version: string, status: string) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.status = status;
    }
}

export default Dataset;