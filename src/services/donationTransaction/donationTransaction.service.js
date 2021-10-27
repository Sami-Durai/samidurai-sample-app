
import { ax } from "services/base";
import { axApp } from "services/base";

class DonationTransactionService {
    getDonationTransactionList(payload) {
        return axApp.get("/sampleData/donationTransactions.json", payload);
    }

    getDonationTransaction(id) {
        return ax.get(`donation-transaction/${id}`);
    }

    addDonationTransaction(payload) {
        return ax.post("donation-transaction", payload);
    }

    updateDonationTransaction(id, payload) {
        return ax.put(`donation-transaction/${id}`, payload);
    }

    removeDonationTransaction(id) {
        return ax.delete(`donation-transaction/${id}`);
    }
}

export default DonationTransactionService;
