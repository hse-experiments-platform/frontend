import { trainedModelsBaseUrl as baseUrl } from "../constants";
import { api } from "../utils";
import Problem from "../../features/trainedModels/model/Problem";
import { GetProblemsResponse } from "./dto";

class ProblemsRepository {
    static async getProblemsList(): Promise<Problem[]> {
        const response =  await api<GetProblemsResponse>('GET', `${baseUrl}/problems?limit=10`, null);
        return response.problems;
    }
}

export default ProblemsRepository;