import { PropertyContainer, PropertyName, PropertyInput } from "../../../components/descriptions"
import { TrainedModel } from "../model"

interface MainInfoBlockProps {
    trainedModel: TrainedModel;
}

const MainInfoBlock = ({trainedModel}: MainInfoBlockProps) => {
    return (
        <PropertyContainer>
            <PropertyName text='Model name'/>
            <PropertyInput disabled={true} value={trainedModel.name}/>

            <PropertyName text='Status'/>
            <PropertyInput disabled={true} value={trainedModel.trainStatus}/>

            <PropertyName text='Base model name'/>
            <PropertyInput disabled={true} value={trainedModel.baseModelName}/>

            <PropertyName text='Dataset'/>
            <PropertyInput disabled={true} value={trainedModel.trainDatasetName}/>

            {
                trainedModel.trainStatus === 'LaunchStatusError' && (
                <>
                    <PropertyName text='Error'/>
                    <PropertyInput disabled={true} value='Internal error'/>
                </>
            )}
        </PropertyContainer>
    )
}

export default MainInfoBlock;