
import { ax } from "services/base";
import { axApp } from "services/base";

class CountryService {
    getCountryList(payload) {
        //return ax.get("dcountry", payload);
        return axApp.get("/sampleData/countries.json", payload);
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

export default CountryService;
