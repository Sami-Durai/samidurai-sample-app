
import { ax } from "services/base";
import { axApp } from "services/base";

class DonationCollectionService {
    getDonationCollectionList(payload) {
        return axApp.get("/sampleData/donationCollections.json", payload);
    }

    getDonationCollection(id) {
        return ax.get(`donation-collection/${id}`);
    }

    addDonationCollection(payload) {
        return ax.post("donation-collection", payload);
    }

    updateDonationCollection(id, payload) {
        return ax.put(`donation-collection/${id}`, payload);
    }

    removeDonationCollection(id) {
        return ax.delete(`donation-collection/${id}`);
    }
}

export default DonationCollectionService;
