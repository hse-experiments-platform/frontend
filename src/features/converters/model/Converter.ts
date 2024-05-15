export class Converter {
    id: string;
    name: string;
    description: string;
    input: string;
    output: string;

    constructor(id: string, name: string, description: string, input: string, output: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.input = input;
        this.output = output;
    }
}