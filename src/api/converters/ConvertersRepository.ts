import { ConvertImageResponse } from "./dto";
import { converterUrl as baseUrl } from "../constants";
import Scale from "../../model/scale/Scale";
import { api } from "../utils";

class ConvertersRepository {
    static async runGraphicConversion(imageUrl: string, scale: Scale): Promise<ConvertImageResponse> {
        return await api<ConvertImageResponse>('POST', `${baseUrl}/process-image`, {
            imageUrl,
            scale
        });
    }
}

export default ConvertersRepository;