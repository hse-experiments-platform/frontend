import { GetMetricResponse } from "./dto";
import { api } from "../utils";
import { launchBaseUrl as baseUrl } from '../constants';
import TrainedModelMetrics from "../../model/metrics/TrainedModelMetrics";
import NumberMetric from "../../model/metrics/NumberMetric";
import ImageMetric from "../../model/metrics/ImageMetric";

const numberMetric: NumberMetric[] = [
    {
        id: 1,
        name: 'Accuracy',
        value: 0.559748427672956
    },
    {
        id: 2,
        name: 'F1 Macro',
        value: 0.20488531134452406
    },
    {
        id: 3,
        name: 'Precision Macro',
        value: 0.19753086419753085
    },
    {
        id: 4,
        name: 'Recall Macro',
        value: 0.2282524120759415
    },
    {
        id: 5,
        name: 'Roc Auc Ovr',
        value: 0.7686366223018157
    },
];


const imageMetrics: ImageMetric[] = [
    {
        id: 1,
        name: 'Accuracy',
        url: 'https://sun9-69.userapi.com/impg/rapIVA-AWpD7N36KKffKH-LCs5Ow78eAYEbimg/MXKIKzPI1a0.jpg?size=260x243&quality=95&sign=0b5b807b3956db8e6a14fbb8e13003c9&type=album'
    },
    {
        id: 2,
        name: 'F1 Macro',
        url: 'https://sun9-26.userapi.com/impg/9GAs7hU_Kd59CqvtAuuygfv9bKgQ6sHoIl7ppw/GGWgaLoF8GU.jpg?size=260x243&quality=95&sign=681bb46d494d8167a6a2f59145860490&type=album'
    },
    {
        id: 3,
        name: 'Fit Time',
        url: 'https://sun9-80.userapi.com/impg/dBNolcRbk4GMbERVSkM31HiBphG3MP1bbaR1Jw/mURtlWlnbsI.jpg?size=277x243&quality=95&sign=6c0ca2303ccf18f46549c79f03e9bac9&type=album'
    },
    {
        id: 4,
        name: 'Precision Macro',
        url: 'https://sun9-79.userapi.com/impg/tCp3FFc4--s55ZRIbf5h8MkH0chnULCfWKcRIA/iQiMC-qpPog.jpg?size=269x243&quality=95&sign=7fd32dfe817fe96fa136e163f560afa0&type=album'
    },
    {
        id: 5,
        name: 'Recall Macro',
        url: 'https://sun9-73.userapi.com/impg/QsbWaRFqji5g9RBSEHwXloXL1_rrdKWwB2PD9Q/zr0b7DMQH3Y.jpg?size=260x244&quality=95&sign=9b60b5cce49c61dc9fae83cc1a33d943&type=album'
    },
    {
        id: 6,
        name: 'Roc Auc Ovr',
        url: 'https://sun9-60.userapi.com/impg/Wc_wrV__f10lonHZaleiuEXAOc36X6S72aTvPA/V04gumhALx4.jpg?size=260x243&quality=95&sign=52282b4576daf3fe4a026f8e2a37dc28&type=album'
    },
    {
        id: 7,
        name: 'Score Time',
        url: ' https://sun9-78.userapi.com/impg/43hmko1ldpRyWl-VKrpgIbtCAazzjhM4f-1G0g/vi3SQtja7aY.jpg?size=277x243&quality=95&sign=5b55259bf34566b694089c64f137dffe&type=album'
    },
]

const featureImportance: ImageMetric = {
    id: 1,
    name: 'Smth',
    url: 'https://images.datacamp.com/image/upload/v1688055328/image_c957bbcce7.png'
}

class MetricsRepository {
    static async getTrainingMetricsForModel(id: number): Promise<TrainedModelMetrics> {
        //const response = await api<GetMetricResponse>('GET', `${baseUrl}/launches/trains/${id}`, null);

        return new TrainedModelMetrics(1, numberMetric, imageMetrics, [featureImportance]);
    }
}

export default MetricsRepository;