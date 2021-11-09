//import { ax } from "services/base";
import { axApp } from "services/base";

class ReportService {
    getDonationReport(payload) {
        return axApp.get("/sampleData/donationReport.json", payload);
    }
}

export default ReportService;
