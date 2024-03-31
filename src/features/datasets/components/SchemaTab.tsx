import styled from 'styled-components';
import DatasetMetadata from "../../../model/datasets/DatasetMetadata";
import { useState, useCallback, useContext } from 'react';
import DatasetColumn from '../../../model/datasets/DatasetColumn';
import DatasetRepository from '../../../api/datasets/DatasetRepository';
import { PropertyName } from '../../../components/descriptions';
import useRequest from '../../../hooks/useRequest';
import SchemaTable from './SchemaTable';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import { RequestContext, RequestContextType } from '../../../contexts';

const SchemaContainer = styled.div<{isDoubleSplit: boolean}>`
    height: 290px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const SubimtButton = styled.button`
    height: 20px;
    border: 1px solid black;
    border-radius: 10px;
    width: 100px;
    margin-left: auto;
    order: 2;
`

interface TabProps {
    metadata: DatasetMetadata | null;
}

const DialogContent = styled(Dialog.Content)`
    background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const DialogOverlay = styled(Dialog.Overlay)`
background-color: grey;
position: fixed;
inset: 0;
`

export const SchemaTab = ({metadata}: TabProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const isEditMode = ['ConvertationError', 'WaitsConvertation'].includes(metadata?.status ?? '');
    const [displayColumns, setDisplayColumns] = useState<DatasetColumn[]>([]);
    const [internalColumns, setInternalColumns] = useState<DatasetColumn[]>([]);
    const { setError } = useContext(RequestContext) as RequestContextType;

    const fetchColumns = useCallback(async () => {
        const datasetId: number = parseInt(metadata?.id.toString() ?? '');
        const response = await DatasetRepository.getDatasetSchema(datasetId);
        setDisplayColumns(response);
        setInternalColumns(response);
    }, [metadata, setDisplayColumns, setInternalColumns]);
    useRequest(fetchColumns, false);

    const updateTypeForColumn = (name: string, newType: string) => {
        const updatedColumns = [...displayColumns];
        updatedColumns[displayColumns.findIndex(c => c.name === name)] = new DatasetColumn(name, newType);
        setDisplayColumns(updatedColumns);

        const updatedColumns2 = [...internalColumns];
        updatedColumns2[internalColumns.findIndex(c => c.name === name)] = new DatasetColumn(name, newType);
        setInternalColumns(updatedColumns2);
    }

    const onSubmit = () => {
        if (internalColumns.findIndex(c => c.type === 'undefined') !== -1) {
            alert('can not save');
            return;
        }
        
        const changeSchema = async () => {
            const schema: any = {};
            for (const col of internalColumns) {
                schema[col.name] = 'ColumnType' + col.type;
            }
            console.log(schema);

            await DatasetRepository.changeSchema(metadata?.id ?? 0, schema);
            navigate('/datasets');
        }

        changeSchema()
            .catch(_ => setError("Request error"));
    }

    const onDeleteColumn = (name: string) => {
        const without = displayColumns.filter(c => c.name !== name);
        setDisplayColumns(without);

        const updatedColumns = [...internalColumns];
        updatedColumns[internalColumns.findIndex(c => c.name === name)] = new DatasetColumn(name, 'Dropped');
        setInternalColumns(updatedColumns);
    }

    return (
        <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
            <div>
            <SchemaContainer isDoubleSplit={false}>
                <PropertyName text={'Dataset columns table'}/>
                <SchemaTable
                    columns={displayColumns}
                    updateColumnType={updateTypeForColumn}
                    canEdit={isEditMode}
                    deleteColumn={onDeleteColumn}
                />
                {isEditMode && <SubimtButton onClick={() => onSubmit()}>Submit</SubimtButton>}
            </SchemaContainer>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Dialog.Title />
                    <Dialog.Description />
                    <Dialog.Close />
                </DialogContent>
            </Dialog.Portal>
            </div>
        </Dialog.Root>
    )
}