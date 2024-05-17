import { GetExperimentInfo, GetExperimentsResponse, GetPredictionLink } from "./dto";
import { launchBaseUrl, trainedModelsBaseUrl as baseUrl } from "../constants";
import { api } from "../utils";
import ExperimentInfo from "../../features/experiments/model/ExperimentInfo";
import ExperimentParams from "../../features/experiments/model/ExperimentParams";
import Paginated from "../../model/PaginatedModel";
import TrainedModelsRepository from "../trainedModels/TrainedModelsRepository";

class ExperimentsRepository {

    static async getPaginatedList(pageIndex: number = 0, query: string | null = null, limit: number): Promise<Paginated<ExperimentInfo>> {
        const offset = pageIndex * 5;
        const response = await api<GetExperimentsResponse>(
            'GET',
            `${baseUrl}/trained/predictions?limit=${limit}&offset=${offset}&query=${query}`,
        );
        return new Paginated(response.pageInfo.total,
            response.predictions.map(p => new ExperimentInfo(p.launchID, p.name, p.status, p.datasetName, p.target, new Date(p.startDateTime)))
        );
    }

    static async launchExperiment(params: ExperimentParams): Promise<void> {
        await api<void>('POST', `${launchBaseUrl}/predict`, params);
    }
    
    static async getExperimentInfo(launchId: string): Promise<ExperimentInfo> {
        const predticion = await api<GetExperimentInfo>('GET', `${launchBaseUrl}/predict/${launchId}`);
        const trainedModel = await TrainedModelsRepository.getTrainedModel(parseInt(predticion.trainedModelID));
        return new ExperimentInfo(launchId, predticion.launchInfo.name,
            predticion.launchInfo.status, trainedModel.trainDatasetName,
            trainedModel.targetColumn, new Date());
    }

    static async getExperimentResultUrl(launchId: string): Promise<string> {
        return (await api<GetPredictionLink>('GET', `${launchBaseUrl}/predict/${launchId}/download`)).downloadLink;
    }
}

export default ExperimentsRepository;