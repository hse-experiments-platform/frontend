import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { IoIosReturnLeft } from "react-icons/io";
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionItem } from '../../../components/accordion/AccordionItem';
import PreprocessingSettingsBlock from './PreprocessingSettingsBlock';
import DatasetColumnTracker from './DatasetColumnTracker';

const StyledBin = styled(IoTrashOutline)`
    color: red;
    width: 30px;
    height: 30x;
`

const StyledReturn = styled(IoIosReturnLeft)`
    color: #021A4C;
    width: 32px;
    height: 32px;
`

interface EditSchemaTabProps {
    columns: DatasetColumnTracker[];
    changeColumnState: (columnName: string, isToActivate: boolean) => void;
    register: (columnPrefix: string) => void;
    watch: (columnPrefix: string) => any;
}

export const EditSchemaTab = ({columns, register, watch, changeColumnState}: EditSchemaTabProps) => {
    
    return (
        <Accordion.Root type="multiple" defaultValue={['main']}>
            {columns.filter(column => column.active).map((column) => (
                <AccordionItem
                    key={column.datasetColumn.name}
                    value={column.datasetColumn.name}
                    title={column.datasetColumn.name}
                    headerAdditionalAction={<StyledBin onClick={() => changeColumnState(column.datasetColumn.name, false)}/>}
                >
                    <PreprocessingSettingsBlock
                        register={(columnPrefix: string) => register(`${column.datasetColumn.name}.${columnPrefix}`)}
                        watch={(columnPrefix: string) => watch(`${column.datasetColumn.name}.${columnPrefix}`)}
                    />
                </AccordionItem>
            ))}
            {columns.filter(column => !column.active).map((column) => (
                <AccordionItem
                    key={column.datasetColumn.name}
                    value={column.datasetColumn.name}
                    title={column.datasetColumn.name}
                    headerAdditionalAction={<StyledReturn onClick={() => changeColumnState(column.datasetColumn.name, true)}/>}
                    disabled
                />
            ))}
        </Accordion.Root>
    )
}