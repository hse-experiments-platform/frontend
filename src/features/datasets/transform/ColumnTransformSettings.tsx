import { useMemo } from "react";
import { Option, buildDefaultOptions } from "../../../model";
import { DatasetColumn } from "../../../model/datasets";
import { LabeledInput, PropertyContainer } from "../../../components/descriptions";
import { LabeledSelector } from "../../../components/descriptions/LabeledSelector";
import ScalingTechnique from "../../../model/datasets/transform/ScalingTechnique";
import EncodingTechnique from "../../../model/datasets/transform/EncodingTechnique";
import { FillingTechnique, fillingVariants, aggregateVariants } from "../../../model/datasets";
import OutliersDetectingMode from "../../../model/datasets/transform/OutliersDetectingMode";

interface ColumnTransformSettingsProps {
    column: DatasetColumn;
    register: (columnPrefix: string) => void;
    watch: any;
}

const ColumnTransformSettings = ({ column, register, watch }: ColumnTransformSettingsProps) => {
    const getOptions = (items: any[]) => {
        const options: Option[] = [];
        for (const item of items) {
            options.push({
                id: item,
                value: item
            });
        }
        return options;
    }
    
    const encodingOptions = useMemo(() => getOptions([
        EncodingTechnique.LabelEncoding,
        EncodingTechnique.OneHotEncoding,
    ]), []);
    const scalingOptions = useMemo(() => getOptions([
        ScalingTechnique.Standardization,
        ScalingTechnique.Normalization,
    ]), []);
    const fillingOptions = useMemo(() => buildDefaultOptions(fillingVariants), []);
    const aggregateOptions = useMemo(() => buildDefaultOptions(aggregateVariants), []);
    const outliersDetectingOptions = useMemo(() => getOptions([
        OutliersDetectingMode.None,
        OutliersDetectingMode.MinMaxThreshold,
        OutliersDetectingMode.IQRMethod
    ]), []);

    const outliersDetectingMode = watch(`columnsSettings.${column.name}.outliersDetectingStrategy.mode`);
    const outliersReplacementMode = watch(`columnsSettings.${column.name}.outliersReplacementStrategy.mode`);
    const outliersReplacementAggregateFunction = watch(`columnsSettings.${column.name}.outliersReplacementStrategy.aggregateFunction`);

    return (
        <PropertyContainer>
            <LabeledInput label="Type" disabled constValue={column.type} />

            {column.type === 'enum' ? (
                <LabeledSelector
                    label="Encoding"
                    register={register("encodingTechnique")}
                    options={encodingOptions}
                    isDefaultSelected={false}
                />) : (
                <LabeledSelector
                    label="Scaling"
                    register={register("scalingTechnique")}
                    options={scalingOptions}
                    isDefaultSelected={false}
                />)
            }

            <LabeledSelector
                label="Outliers detecting strategy"
                register={register("outliersDetectingStrategy.mode")}
                options={outliersDetectingOptions}
                isDefaultSelected={false}
            />

            {outliersDetectingMode === OutliersDetectingMode.MinMaxThreshold && (
                <>
                    <LabeledInput
                        label="Max threshold"
                        register={register("outliersDetectingStrategy.max")}
                    />
                    <LabeledInput
                        label="Max threshold"
                        register={register("outliersDetectingStrategy.min")}
                    />
                </>
            )}

            {outliersDetectingMode !== OutliersDetectingMode.None && (
                <>
                    <LabeledSelector
                        label="Outliers replacement strategy"
                        register={register("outliersReplacementStrategy.mode")}
                        options={fillingOptions}
                        isDefaultSelected={false}
                    />

                    {outliersReplacementMode === FillingTechnique.FillWithConstant && (
                        <LabeledInput
                            label="Constant value"
                            register={register("outliersReplacementStrategy.constantValue")}
                        />
                    )}

                    {outliersReplacementMode === FillingTechnique.FillWithAggregateFunction && (
                        <LabeledSelector
                            label="Aggregate function"
                            register={register("outliersReplacementStrategy.aggregateFunction")}
                            defaultValue={undefined}
                            isDefaultSelected={outliersReplacementAggregateFunction === undefined}
                            options={aggregateOptions}
                        />
                    )}
                </>
            )}
        </PropertyContainer>
    )
}

export default ColumnTransformSettings;