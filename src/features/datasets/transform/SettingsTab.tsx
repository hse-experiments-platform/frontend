import * as Accordion from '@radix-ui/react-accordion';
import { AccordionItem } from '../../../components/accordion/AccordionItem';
import { DatasetColumn } from "../../../model/datasets";
import ColumnTransformSettings from "./ColumnTransformSettings";

interface SettingsTabProps {
    columns: DatasetColumn[];
    register: (columnPrefix: string) => void;
    watch: any;
}

export const SettingsTab = ({columns, register, watch}: SettingsTabProps) => {

    return (
        <div>
            <Accordion.Root type="multiple" defaultValue={['main']}>
                {columns.map((column) => (
                    <AccordionItem
                        key={column.name}
                        value={column.name}
                        title={column.name}
                    >
                        <ColumnTransformSettings
                            column={column}
                            register={(propertyName: string) => register(`${column.name}.${propertyName}`)}
                            watch={watch}
                        />
                    </AccordionItem>
                ))}
            </Accordion.Root>
        </div>
    )
}