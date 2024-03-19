import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ShallowTable } from "../../../components";
import { datasetMetadata } from "../../../api/datasets/DatasetRepository";

const PropertyContainer = styled.div`
`

const PropertyName = styled.h3`
`

export const MetadataTab = () => {
    const { id } = useParams();
    const data = [];
    for (const column of datasetMetadata.columns) {
        data.push([column.name, column.type])
    }

    return (
        <>
            <PropertyContainer>
                <PropertyName>Dataset name</PropertyName>
                <input type='text'/>
            </PropertyContainer>
            <PropertyContainer>
                <PropertyName>Version</PropertyName>
                <p>v.1.0</p>
            </PropertyContainer>
            <PropertyContainer>
                <PropertyName>Dataset columns table</PropertyName>
                <ShallowTable columnNames={['Column name', 'Data type']} data={data} needsStringify={false}/>
            </PropertyContainer>
        </>
    )
}