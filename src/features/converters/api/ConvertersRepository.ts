import { ConvertImageResponse } from "./dto";
import { converterUrl as baseUrl } from "../../../api/constants";
import { Scale, Converter } from "../model";
import { api } from "../../../api/utils";
import Paginated from "../../../model/PaginatedModel";

class ConvertersRepository {
    static async getPaginatedConverters(pageIndex: number = 0, query: string | null = null, limit: number): Promise<Paginated<Converter>> {
        return new Paginated<Converter>(1,
            [
                new Converter(
                '1',
                'Graphic converter',
                'Converts graphic into array of points coordinates',
                '.png | .jpg',
                '.csv')
            ]
        )
    }

    static async runGraphicConversion(imageUrl: string, scale: Scale): Promise<ConvertImageResponse> {
        return await api<ConvertImageResponse>('POST', `${baseUrl}/process-image`, {
            imageUrl,
            scale
        });
    }
}

export default ConvertersRepository;