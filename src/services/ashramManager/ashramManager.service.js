
import { ax } from "services/base";
import { axApp } from "services/base";

class AshramManagerService {
    getAshramManagerList(payload) {
        return axApp.get("/sampleData/ashramManagers.json", payload);
    }

    getAshramManager(id) {
        return ax.get(`ashram-manager/${id}`);
    }

    addAshramManager(payload) {
        return ax.post("ashram-manager", payload);
    }

    updateAshramManager(id, payload) {
        return ax.put(`ashram-manager/${id}`, payload);
    }

    removeAshramManager(id) {
        return ax.delete(`ashram-manager/${id}`);
    }
}

export default AshramManagerService;
