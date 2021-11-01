
import { ax } from "services/base";

class HelpService {
  bulkStatusUpdate(payload) {
    return ax.post("bulkstatusupdate", payload);
  }

  bulkDelete(payload) {
    return ax.delete("bulkDelete", { data: payload });
  }
}

export default HelpService;
