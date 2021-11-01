
import { ax } from "services/base";
import { axApp } from "services/base";

class OrganizationService {
    getOrganizationList(payload) {
        return axApp.get("/sampleData/organizations.json", payload);
    }

    getOrganization(id) {
        return ax.get(`organization/${id}`);
    }

    addOrganization(payload) {
        return ax.post("organization", payload);
    }

    updateOrganization(id, payload) {
        return ax.put(`organization/${id}`, payload);
    }

    removeOrganization(id) {
        return ax.delete(`organization/${id}`);
    }
}

export default OrganizationService;
