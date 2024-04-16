import EnumerationPage from "../../components/pages/EnumerationPage";

const ListExperimentsPage = () => {
    const noop: any = () => {};

    return (
        <EnumerationPage
            pageTitle="Experiments"
            columnNames={['Name', 'Status', 'Model name', 'Problem', 'Dataset']}
            requestData={noop}
            requestPagesAmount={noop}
            dataTransformer={noop}
            sectionUrl="/trained-models"
        />
    )
}

export default ListExperimentsPage;