
import { ax } from "services/base";

class DropdownService {
    getFCList() {
        return ax.get("dropdown/fc");
    }

    getGeneralStatusList() {
        return ax.get("dropdown/generalStatus");
    }
}

export default DropdownService;
