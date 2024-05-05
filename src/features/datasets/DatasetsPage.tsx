import EnumerationPage from "../../components/pages/EnumerationPage";
import { DatasetRepository } from "../../api";
import Dataset from "../../model/datasets/Dataset";
import TableRow from "../../components/TableRow";


export const DatasetsPage = () => {
    const dataRequest = async (page: number, query: string) => await DatasetRepository.getDatasetsList(page, query);
    const paginationRequest = async (query: string) => await DatasetRepository.getPagesCount(query);

    const dataTransformer = (dataset: Dataset):TableRow=> {
        return {
            id: dataset.id.toString(),
            values: [dataset.name, dataset.version, dataset.status]
        }
    }

    return (
        <EnumerationPage
            pageTitle="Datasets"
            columnNames={['Name', 'Version', 'Status']}
            requestData={dataRequest}
            requestPagesAmount={paginationRequest}
            dataTransformer={dataTransformer}
            addUrl="/datasets/add"
            getItemUrl={(id: string) => `/datasets/${id}`}
        />
    );
}