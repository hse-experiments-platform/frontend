import { GetMetricResponse } from "./dto";
import { api } from "../utils";
import { launchBaseUrl as baseUrl } from '../constants';
import Metric from "../../model/metrics/Metric";

class MetricsRepository {
    static async getTrainingMetricsForModel(id: number): Promise<Metric[]> {
        const response = await api<GetMetricResponse>('GET', `${baseUrl}/launches/trains/${id}`, null);
        return response.metrics;
    }
}

export default MetricsRepository;