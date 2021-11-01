
import { ax } from "services/base";

import { axCityAutoComplete } from "services/base";

class DropdownService {
    getGeneralStatusList() {
        return ax.get("dropdown/generalStatus");
    }

    getCountryList() {
        return ax.get("dropdown/country");
    }

    getOrganizationList() {
        return ax.get("dropdown/organization");
    }

    getFinanceControllerList() {
        return ax.get("dropdown/fc");
    }

    getAshramManagerList() {
        return ax.get("dropdown/am");
    }

    getAutoCompleteCities(payload) {
        return axCityAutoComplete.get("gplaces", {
            params: {
                session: "74c576ef-7234-4f47-8b11-f8e41d247f3b",
                input: payload
            }
        })
    }
}

export default DropdownService;
