import ExperimentsRepository from "../../api/experiments/ExperimentsRepository";
import EnumerationPage from "../../components/pages/EnumerationPage";
import ExperimentInfo from "./model/ExperimentInfo";
import TableRow from "../../components/TableRow";



const ListExperimentsPage = () => {    
    const dataRequest = async (page: number, query: string, limit: number) =>
        await ExperimentsRepository.getPaginatedList(page, query, limit);

    const dataTransformer = (experiment: ExperimentInfo): TableRow => {
        return {
            id: experiment.id,
            values: [experiment.name, experiment.status, experiment.datasetName,
                experiment.target, experiment.startDateTime.toDateString()]
        }
    }

    window.addEventListener("unload", function(){
        var count = parseInt(localStorage.getItem('counter') || '0');
      
        localStorage.setItem('counter', (++count).toString())
      }, false);

    return (
        <EnumerationPage
            pageTitle="Experiments"
            columnNames={['Name', 'Status', 'Dataset', 'Target', 'Launch Time']}
            requestData={dataRequest}
            dataTransformer={dataTransformer}
            addUrl="/experiments/add"
            getItemUrl={(id: string) => `/experiments/${id}`}
        />
    )
}

export default ListExperimentsPage;