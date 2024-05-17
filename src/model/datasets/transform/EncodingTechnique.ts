export enum EncodingTechnique {
    OneHotEncoding = 'OneHotEncoding',
    LabelEncoding = 'LabelEncoding'
}

export const mapEncodingTechniqueIntoString = (encodingTechnique: EncodingTechnique): string => `EncodingTechnique${encodingTechnique}`;