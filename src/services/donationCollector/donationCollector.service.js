import { axApp } from "../../services/base";
//import { ax } from "../../services/base";

class donationCollectorService {
    getDonationCollectors(/*payload*/) {
        return axApp.get("/sampleData/donationCollectors.json");
        //return ax.post("donationcollector", payload);
    }
}


export default donationCollectorService;
