
import { ax } from "services/base";
import { axApp } from "services/base";

class DonationService {
    getDonationList(payload) {
        return axApp.get("/sampleData/donations.json", payload);
    }

    getDonation(id) {
        return ax.get(`donation/${id}`);
    }

    addDonation(payload) {
        return ax.post("donation", payload);
    }

    updateDonation(id, payload) {
        return ax.put(`donation/${id}`, payload);
    }

    removeDonation(id) {
        return ax.delete(`donation/${id}`);
    }
}

export default DonationService;
