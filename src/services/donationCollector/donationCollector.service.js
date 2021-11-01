
import { ax } from "services/base";
import { axApp } from "services/base";

class DonationCollectorService {
    getDonationCollectorList(payload) {
        return axApp.get("/sampleData/donationCollectors.json", payload);
    }

    getDonationCollector(id) {
        return ax.get(`donation-collector/${id}`);
    }

    addDonationCollector(payload) {
        return ax.post("donation-collector", payload);
    }

    updateDonationCollector(id, payload) {
        return ax.put(`donation-collector/${id}`, payload);
    }

    removeDonationCollector(id) {
        return ax.delete(`donation-collector/${id}`);
    }
}

export default DonationCollectorService;
