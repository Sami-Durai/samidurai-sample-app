
import { ax } from "services/base";
import { axApp } from "services/base";

class DonationAccountService {
    getDonationAccountList(payload) {
        return axApp.get("/sampleData/donationAccounts.json", payload);
    }

    getDonationAccount(id) {
        return ax.get(`donationAccount/${id}`);
    }

    addDonationAccount(payload) {
        return ax.post("donationAccount", payload);
    }

    updateDonationAccount(id, payload) {
        return ax.put(`donationAccount/${id}`, payload);
    }

    removeDonationAccount(id) {
        return ax.delete(`donationAccount/${id}`);
    }
}

export default DonationAccountService;
