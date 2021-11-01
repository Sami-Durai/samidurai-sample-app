
import { ax } from "services/base";
import { axApp } from "services/base";

class PaymentTransactionService {
    getPaymentTransactionList(payload) {
        return axApp.get("/sampleData/paymentTransactions.json", payload);
    }

    getPaymentTransaction(id) {
        return ax.get(`payment-transaction/${id}`);
    }

    addPaymentTransaction(payload) {
        return ax.post("payment-transaction", payload);
    }

    updatePaymentTransaction(id, payload) {
        return ax.put(`payment-transaction/${id}`, payload);
    }

    removePaymentTransaction(id) {
        return ax.delete(`payment-transaction/${id}`);
    }
}

export default PaymentTransactionService;
