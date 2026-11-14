import { apiClient } from "../../../shared/lib/apiClient";
import type { AuthInputType, AuthResponseType } from "../types/UserAuthType";

const authService = {

    login: async(userInput: AuthInputType) => {
        return apiClient.post("/users/api/login", userInput);
    },

    authCheck: async() => {
        return apiClient.get<AuthResponseType>("/users/api/authCheck");
    }

}

export default authService;