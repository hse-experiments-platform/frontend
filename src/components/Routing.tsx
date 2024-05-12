import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { AuthPage } from '../features/auth/AuthPage';
import { DatasetsPage, AddDatasetPage, DatasetInfoPage, TransformDatasetPage } from "../features/datasets";
import ModelsPage from '../features/trainedModels/ModelsPage';
import { LogoutPage } from "../features/auth/LogoutPage";
import AddModelPage from "../features/trainedModels/add/AddModelPage";
import InfoPage from "../features/info/InfoPage";
import TrainedModelPage from "../features/trainedModels/trained/TrainedModelPage";
import ListExperimentsPage from "../features/experiments/ListExperimentsPage";
import ListConvertersPage from "../features/converters/ListConvertersPage";
import { GraphicUploadPage } from "../features/converters/GraphicUpload";
import LaunchExperimentPage from "../features/experiments/LaunchExperimentPage";
import ExperimentInfoPage from "../features/experiments/ExperimentInfoPage";
import { GraphicScaleDefinePage } from "../features/converters/GraphicScaleDefinePage";
import { ImageConvertResultPage } from "../features/converters/ImageConvertResultPage";

export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={<AuthPage/>}
              />
              <Route
                path="/datasets"
                element={<DatasetsPage/>}
              />
              <Route
                path="*"
                element={<Navigate to="datasets" replace />}
              />
              <Route
               path="/datasets/:id"
                element={<DatasetInfoPage/>}
              />
               <Route
               path="/datasets/add"
                element={<AddDatasetPage/>}
              />
              <Route
               path="/datasets/:id/transform"
                element={<TransformDatasetPage/>}
              />
              <Route
                path="/trained-models"
                element={<ModelsPage/>}
              />
              <Route
                path="/trained-models/:id"
                element={<TrainedModelPage/>}
              />
              <Route
                path="/trained-models/add"
                element={<AddModelPage/>}
              />
              <Route
                path="/experiments"
                element={<ListExperimentsPage/>}
              />
              <Route
                path="/experiments/:id"
                element={<ExperimentInfoPage/>}
              />
              <Route
                path="/experiments/add"
                element={<LaunchExperimentPage/>}
              />
              <Route
                path="/converters"
                element={<ListConvertersPage/>}
              />
              <Route
                path="/converters/graphic/upload"
                element={<GraphicUploadPage/>}
              />
              <Route
                path="/converters/graphic/define-scale"
                element={<GraphicScaleDefinePage/>}
              />
              <Route
                path="/converters/graphic/result"
                element={<ImageConvertResultPage/>}
              />
               <Route
                path="/info"
                element={<InfoPage/>}
              />
              <Route
                path="/logout"
                element={<LogoutPage/>}
              />
            </Routes>
        </BrowserRouter>
    );
}