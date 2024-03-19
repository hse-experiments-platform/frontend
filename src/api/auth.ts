import { api } from "./utils";

export interface GetTokenBody {
    google_oauth_token: string;
}

export interface GetTokenResponse {
    token: string;
    user_id: number;
}


export const getToken = async (data: GetTokenBody) => {
    return await api<GetTokenResponse>('POST', 'http://tcarzverey.ru:8082/api/v1/login/google', null, data);
}