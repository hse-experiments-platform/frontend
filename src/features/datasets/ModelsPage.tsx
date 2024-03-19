import ProtectedPage from '../../components/pages/ProtectedPage';
import { PageTitle, CustomTable } from '../../components';

export const ModelsPage = () => {

    return (
        <ProtectedPage>
           <PageTitle title='Trained models'/>
           <CustomTable
                data={[]}
                columnNames={['Name', 'Type', 'Training dataset', 'Status']}
                division='1fr 1fr 1fr 1fr'
                onClick={() => console.log()}
            />
        </ProtectedPage>
    );
}

