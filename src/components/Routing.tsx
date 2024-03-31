import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { AuthPage } from '../features/auth/AuthPage';
import DatasetsPage from '../features/datasets/DatasetsPage';
import ModelsPage from '../features/trainedModels/ModelsPage';
import { DatasetInfoPage } from "../features/datasets/DatasetInfoPage";
import { AddDatasetPage } from "../features/datasets/AddDatasetPage";
import { LogoutPage } from "../features/auth/LogoutPage";
import AddModelPage from "../features/trainedModels/add/AddModelPage";
import InfoPage from "../features/info/InfoPage";
import TrainedModelPage from "../features/trainedModels/TrainedModelPage";

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
               path="/datasets/:id"
                element={<DatasetInfoPage/>}
              />
               <Route
               path="/datasets/add"
                element={<AddDatasetPage/>}
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