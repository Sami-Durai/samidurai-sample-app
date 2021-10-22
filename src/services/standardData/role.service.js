
import { ax } from "services/base";
import { axApp } from "services/base";

class RoleService {
    getRoleList(payload) {
        return axApp.get("/sampleData/roles.json", payload);
    }

    getRole(id) {
        return ax.get(`role/${id}`);
    }

    addRole(payload) {
        return ax.post("role", payload);
    }

    updateRole(id, payload) {
        return ax.put(`role/${id}`, payload);
    }

    removeRole(id) {
        return ax.delete(`role/${id}`);
    }
}

export default RoleService;
