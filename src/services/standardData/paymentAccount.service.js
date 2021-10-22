
import { ax } from "services/base";
import { axApp } from "services/base";

class PaymentAccountService {
    getPaymentAccountList(payload) {
        return axApp.get("/sampleData/paymentAccounts.json", payload);
    }

    getPaymentAccount(id) {
        return ax.get(`paymentAccount/${id}`);
    }

    addPaymentAccount(payload) {
        return ax.post("paymentAccount", payload);
    }

    updatePaymentAccount(id, payload) {
        return ax.put(`paymentAccount/${id}`, payload);
    }

    removePaymentAccount(id) {
        return ax.delete(`paymentAccount/${id}`);
    }
}

export default PaymentAccountService;
