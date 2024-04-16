import { GetExperimentsResponse } from "./dto";
import { launchBaseUrl as baseUrl } from "../constants";
import { api } from "../utils";
import ExperimentInfo from "../../model/experiments/Experiment";

class ExperimentsRepository {
    static async getExperiments(): Promise<ExperimentInfo[]> {
        const response = await api<GetExperimentsResponse>('GET', `${baseUrl}/launches?launchTypes.IncludePredict=true`, null);
        return response.experiments;
    }
}