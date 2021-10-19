
import { ax } from "services/base";

class CountryService {
    getCountryList(payload) {
        return ax.post("listcountry", payload);
    }

    getCountry(id) {
        return ax.get(`country/${id}`);
    }

    addCountry(payload) {
        return ax.post("country", payload);
    }

    updateCountry(id, payload) {
        return ax.put(`country/${id}`, payload);
    }

    removeCountry(id) {
        return ax.delete(`country/${id}`);
    }
}

export default  CountryService;
