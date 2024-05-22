import { serviceName_lespepitestech } from "@/controller/scraping-services/Services/Config/lespepitestech/config.js";
import { json_ReqResType_lespepitestech } from "./lespepitestech/ConfigReqRes.js";
import { serviceName_entreprise_ } from "@/controller/scraping-services/Services/Config/entreprise_/config.js";
import { json_ReqResType_entreprise_ } from "./entreprise_/ConfigReqRes.js";


export const json_ReqResType = {
    // #ADD NEW SERVICE HERE
    [serviceName_lespepitestech]: json_ReqResType_lespepitestech,
    [serviceName_entreprise_] :  json_ReqResType_entreprise_
} as const 