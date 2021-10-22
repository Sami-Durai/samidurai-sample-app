
import { ax } from "services/base";

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
}

export default DropdownService;
