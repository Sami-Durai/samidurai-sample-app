
import { ax } from "services/base";
import { axApp } from "services/base";

class FinanceControllerService {
    getFinanceControllerList(payload) {
        return axApp.get("/sampleData/financeControllers.json", payload);
    }

    getFinanceController(id) {
        return ax.get(`finance-controller/${id}`);
    }

    addFinanceController(payload) {
        return ax.post("finance-controller", payload);
    }

    updateFinanceController(id, payload) {
        return ax.put(`finance-controller/${id}`, payload);
    }

    removeFinanceController(id) {
        return ax.delete(`finance-controller/${id}`);
    }
}

export default FinanceControllerService;
