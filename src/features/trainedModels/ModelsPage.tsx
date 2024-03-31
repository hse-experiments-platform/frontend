import EnumerationPage from "../../components/pages/EnumerationPage";
import TrainedModelsRepository from "../../api/trainedModels/TrainedModelsRepository";
import { TrainedModel } from "../../model/trainedModels";
import TableRow from "../../components/TableRow";

const ModelsPage = () => {
    const dataRequest = async (page: number, query: string) => await TrainedModelsRepository.getTrainedModelsList(page, query);
    const paginationRequest = async (query: string) => await TrainedModelsRepository.getPagesCount(query);

    const dataTransformer = (trainedModel: TrainedModel):TableRow => {
        return {
            id: trainedModel.trainedModelID,
            values: [trainedModel.name, trainedModel.trainStatus, trainedModel.baseModelName,
                trainedModel.problemName, trainedModel.trainDatasetName]
        }
    }

    return (
        <EnumerationPage
            pageTitle="Trained models"
            columnNames={['Name', 'Status', 'Model name', 'Problem', 'Dataset']}
            requestData={dataRequest}
            requestPagesAmount={paginationRequest}
            dataTransformer={dataTransformer}
            sectionUrl="/trained-models"
        />
    );
}

export default ModelsPage;

