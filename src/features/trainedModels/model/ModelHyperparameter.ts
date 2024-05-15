class ModelHyperparameter {
    id: string;
    name: string;
    defaultValue: string;

    constructor(id: string, name: string, defaultValue: string) {
        this.id = id;
        this.name = name;
        this.defaultValue = defaultValue;
    }
}

export default ModelHyperparameter;