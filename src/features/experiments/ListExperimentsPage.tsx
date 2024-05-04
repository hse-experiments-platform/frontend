import { useRef } from 'react';
import ExperimentsRepository from "../../api/experiments/ExperimentsRepository";
import EnumerationPage from "../../components/pages/EnumerationPage";
import ExperimentInfo from "../../model/experiments/ExperimentInfo";
import TableRow from "../../components/TableRow";



const ListExperimentsPage = () => {    
    const dataRequest = async (page: number, query: string) => await ExperimentsRepository.getList(page, query);
    const paginationRequest = async (query: string) => await ExperimentsRepository.getPagesCount(query);

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
            requestPagesAmount={paginationRequest}
            dataTransformer={dataTransformer}
            addUrl="/experiments/add"
            getItemUrl={(id: string) => `/experiments/${id}`}
        />
    )
}

export default ListExperimentsPage;