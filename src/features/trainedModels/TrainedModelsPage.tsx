import EnumerationPage from "../../components/pages/EnumerationPage";
import TrainedModelsRepository from "../../api/trainedModels/TrainedModelsRepository";
import { TrainedModel } from "./model";
import TableRow from "../../components/TableRow";

const TrainedModelsPage = () => {
    const dataRequest = async (page: number, query: string, limit: number) => await TrainedModelsRepository.getPaginatedTrainedModelsList(page, query, limit);

    const dataTransformer = (trainedModel: TrainedModel):TableRow => {
        return {
            id: trainedModel.trainedModelID,
            values: [trainedModel.name, trainedModel.trainStatus, trainedModel.baseModelName,
                trainedModel.problemName, trainedModel.trainDatasetName]
        }
    }

    window.addEventListener("unload", function(){
        var count = parseInt(localStorage.getItem('trained') || '0');
      
        localStorage.setItem('trained', (++count).toString())
      }, false);

    return (
        <EnumerationPage
            pageTitle="Trained models"
            columnNames={['Name', 'Status', 'Model name', 'Problem', 'Dataset']}
            requestData={dataRequest}
            dataTransformer={dataTransformer}
            addUrl="/trained-models/add"
            getItemUrl={(id: string) => `/trained-models/${id}`}
        />
    );
}

export default TrainedModelsPage;

