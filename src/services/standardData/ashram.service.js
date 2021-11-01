
import { ax } from "services/base";
import { axApp } from "services/base";

class AshramService {
    getAshramList(payload) {
        return axApp.get("/sampleData/ashrams.json", payload);
    }

    getAshram(id) {
        return ax.get(`ashram/${id}`);
    }

    addAshram(payload) {
        return ax.post("ashram", payload);
    }

    updateAshram(id, payload) {
        return ax.put(`ashram/${id}`, payload);
    }

    removeAshram(id) {
        return ax.delete(`ashram/${id}`);
    }
}

export default AshramService;
