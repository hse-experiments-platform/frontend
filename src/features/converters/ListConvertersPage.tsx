import { useCallback } from "react";
import TableRow from "../../components/TableRow";
import EnumerationPage from "../../components/pages/EnumerationPage";
import ConvertersRepository from "./api/ConvertersRepository";
import { Converter } from "./model";

const ListConvertersPage = () => {
    const dataRequest = useCallback(async (page: number, query: string, limit: number) =>
        await ConvertersRepository.getPaginatedConverters(page, query, limit), []);

    const dataTransformer = useCallback((converter: Converter):TableRow=> {
        return {
            id: converter.id.toString(),
            values: [converter.name, converter.description, converter.input, converter.output]
        }
    }, [])

    return (
        <EnumerationPage
            pageTitle="Converters"
            columnNames={['Name', 'Description', 'Input', 'Output']}
            requestData={dataRequest}
            dataTransformer={dataTransformer}
            getItemUrl={_ => "/converters/graphic/upload"}
            division='1fr 1.5fr 1fr 1fr'
        />
    );
}

export default ListConvertersPage;