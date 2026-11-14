import { apiClient } from "../../../shared/lib/apiClient";
import type { UserInputType } from "../types/UserType";

const usersService = {

    register: async(userInput: UserInputType) => {

        return apiClient.post("/users/api/register", userInput);
        
    }

};

export default usersService;