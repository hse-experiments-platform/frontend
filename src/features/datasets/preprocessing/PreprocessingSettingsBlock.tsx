import { useMemo } from 'react';
import { LabeledInput, PropertyContainer, LabeledSelector } from "../../../components/descriptions";
import { buildDefaultOptions } from "../../../model";
import { FillingTechnique, fillingVariants, fillingVariantsForEnum, aggregateVariants, DatasetColumn, aggregateVariantsForEnum } from "../../../model/datasets";
import { dataTypeVariants } from '../../../model/datasets/preprocessing';

interface PreprocessingSettingsBlockProps {
    register: (columnPrefix: string) => void;
    watch: any;
}

const PreprocessingSettingsBlock = ({register, watch}: PreprocessingSettingsBlockProps) => {
    const typeOptions = buildDefaultOptions(dataTypeVariants);
    const fillingOptions = useMemo(() => buildDefaultOptions(fillingVariants), []);
    const enumFillingOptions = useMemo(() => buildDefaultOptions(fillingVariantsForEnum), []);
    const aggregateOptions = useMemo(() => buildDefaultOptions(aggregateVariants), []);
    const enumAggregateOptions = useMemo(() => buildDefaultOptions(aggregateVariantsForEnum), []);
    
    const selectedType = watch(`columnType`);
    const emptiesStrategyType = watch(`emptiesStrategy.technique`);

    return (
        <PropertyContainer>
            <LabeledSelector
                label="Data type"
                register={register("columnType")}
                options={typeOptions}
                isDefaultSelected={selectedType === 'Undefined'}
                defaultValue='Undefined'
            />
            
            {selectedType != 'Undefined' && (
                <LabeledSelector
                    label="Empties strategy"
                    register={register("emptiesStrategy.technique")}
                    options={selectedType === "Categorical" ? enumFillingOptions : fillingOptions}
                    isDefaultSelected={false}
                />
            )}

            {emptiesStrategyType === FillingTechnique.FillWithConstant && (
                <LabeledInput
                    label="Constant value"
                    register={register("emptiesStrategy.constantValue")}
                />
            )}


            {emptiesStrategyType === FillingTechnique.FillWithAggregateFunction && (
                <LabeledSelector
                    label="Aggregate function"
                    register={register("emptiesStrategy.aggregateFunction")}
                    isDefaultSelected={false}
                    options={selectedType === "Categorical" ? enumAggregateOptions : aggregateOptions}
                />
            )}
        </PropertyContainer>
    )
}

export default PreprocessingSettingsBlock;