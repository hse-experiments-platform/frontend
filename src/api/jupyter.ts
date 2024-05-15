import { api } from "./utils";

interface GetNotebookUrlBody {
    datasetId: string;
    datasetName: string;
}

export const getNotebookUrl = async (data: GetNotebookUrlBody): Promise<string> => {
    return await api<string>('POST', 'http://tcarzverey.ru:5000/jupyter-notebook-for-dataset', {
        dataset_id: data.datasetId,
        dataset_name: data.datasetName
    });
}