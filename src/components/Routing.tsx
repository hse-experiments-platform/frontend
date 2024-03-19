import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { AuthPage } from '../features/auth/AuthPage';
import DatasetsPage from '../features/datasets/DatasetsPage';
import { ModelsPage } from '../features/datasets/ModelsPage';
import { DatasetInfoPage } from "../features/datasets/DatasetInfoPage";
import { AddDatasetPage } from "../features/datasets/AddDatasetPage";
import { LogoutPage } from "../features/auth/LogoutPage";

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
                path="/models"
                element={<ModelsPage/>}
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
                path="/logout"
                element={<LogoutPage/>}
              />
            </Routes>
        </BrowserRouter>
    );
}