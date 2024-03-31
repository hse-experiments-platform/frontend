import { TableContainer, TableCell, TableRow, TableHeaderCell } from "../../../components";
import styled from 'styled-components';
import { PropertySelector, Option } from "../../../components/descriptions";
import ScrollContainer from "../../../components/scroll/ScrollElements";
import DatasetColumn from "../../../model/datasets/DatasetColumn";
import { IoTrashOutline } from "react-icons/io5";

interface SchemaTableProps {
    columns: DatasetColumn[];
    updateColumnType: (name: string, newType: string) => void;
    deleteColumn: (name: string) => void;
    canEdit: boolean;
}

const StyledBin = styled(IoTrashOutline)`
    color: red;
    width: 27px;
    height: 27x;
`

const SchemaTable = ({columns, updateColumnType, canEdit, deleteColumn}: SchemaTableProps) => {
    const options: Option[] = ['Integer', 'Float', 'Categorial', 'String'].map(v => ({
        id: v,
        value: v
    }));
    
    return (
        <TableContainer>
            <ScrollContainer>
                <TableRow count={canEdit ? 3 : 2} extra={canEdit? 1:0}>
                    <TableHeaderCell isLeft={true}>
                         Column name
                    </TableHeaderCell>
                    <TableHeaderCell isLeft={false}>
                         Data type
                    </TableHeaderCell>
                    {canEdit && <TableHeaderCell isLeft={false}/>}
                </TableRow>

                {columns.map(column =>
                    <TableRow count={canEdit ? 3: 2} extra={canEdit ?1: 0}>
                        <TableCell isLeft={true}>
                            {column.name}
                        </TableCell>
                        <TableCell isLeft={false}>
                            {canEdit ?
                                <PropertySelector
                                    selectedId={column.type}
                                    selectOption={(newType: string) => updateColumnType(column.name, newType)}
                                    defaultValue="undefined"
                                    options={options}
                                /> :
                                <p>{column.type}</p>
                            }
                        </TableCell>
                        {canEdit && <TableCell isLeft={false} onClick={() => deleteColumn(column.name)}>
                            <StyledBin/>
                        </TableCell>}
                    </TableRow>
                )}
            </ScrollContainer>
        </TableContainer>
    )
}

export default SchemaTable;