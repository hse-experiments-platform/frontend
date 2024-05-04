import TableRow from "../../components/TableRow";
import EnumerationPage from "../../components/pages/EnumerationPage";

const ListConvertersPage = () => {
    const graphicConverter: TableRow = {
        id: '1',
        values: ['Graphic converter',
            'Converts graphic into array of points coordinates',
            '.png | .jpg',
            '.csv'
        ]
    }

    const makeFakePromise = <Type extends {}>(obj: Type) => {
        return new Promise<Type>((resolve) => {
            resolve(obj);
        })
    }

    return (
        <EnumerationPage
            pageTitle="Converters"
            columnNames={['Name', 'Description', 'Input', 'Output']}
            requestData={(_1, _2) => makeFakePromise([graphicConverter])}
            requestPagesAmount={_ => makeFakePromise(1)}
            dataTransformer={item => item}
            getItemUrl={_ => "/converters/graphic/upload"}
            division='1fr 1.5fr 1fr 1fr'
        />
    );
}

export default ListConvertersPage;