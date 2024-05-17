import { useContext, useCallback } from "react";
import EnumerationPage from "../../components/pages/EnumerationPage";
import { DatasetRepository } from "../../api";
import { Dataset } from "../../model/datasets/Dataset";
import TableRow from "../../components/TableRow";
import { SlPencil } from "react-icons/sl";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getNotebookUrl } from "../../api/jupyter";
import { RequestContext, RequestContextType } from "../../contexts";


export const DatasetsPage = () => {
    const { setIsLoading } = useContext(RequestContext) as RequestContextType;
    const navigate = useNavigate();

    const dataRequest = useCallback(async (page: number, query: string, limit: number) =>
        await DatasetRepository.getPaginatedDatasetsList(page, query, limit), []);

    const dataTransformer = useCallback((dataset: Dataset): TableRow=> {
        return {
            id: dataset.id.toString(),
            values: [dataset.name, dataset.version, dataset.status]
        }
    }, [])

    const onJupyterRequest = useCallback((datasetId: string, datasetName: string) => {
        setIsLoading(true);
        
        getNotebookUrl({
            datasetId: datasetId,
            datasetName: datasetName
        })
        .then((url) => window.open(url, "_blank"))
        .catch(() => alert("Error during notebook request. Try again later"))
        .finally(() => setIsLoading(false))
    }, [])

    return (
        <EnumerationPage<Dataset>
            pageTitle="Datasets"
            columnNames={['Name', 'Version', 'Status']}
            requestData={dataRequest}
            dataTransformer={dataTransformer}
            addUrl="/datasets/add"
            getItemUrl={(id: string) => `/datasets/${id}`}
            options={[
                {
                    icon: <SlPencil />,
                    name: "Transform",
                    onClick: (id: string) => navigate(`/datasets/${id}/transform`)
                },
                {
                    icon: <FaExternalLinkAlt />,
                    name: "Open in Jupyter",
                    onClick: (id: string, name: string) => onJupyterRequest(id, name),
                    color: "#e06e30"
                }
            ]}
        />
    );
}