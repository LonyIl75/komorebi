import { serviceName_lespepitestech } from "@/controller/scraping-services/Services/Config/lespepitestech/config.js";
import { str_login } from "../Services/src/lespepitestech/Services/Login/human-actions.js";
import { str_main } from "../Services/src/lespepitestech/Services/Main/human-actions.js";
import { str_startupsMtp } from "../Services/src/lespepitestech/Services/StartupsMtp/human-actions.js";
import { LespepitestechServiceStartupsMtp } from "../Services/src/lespepitestech/Services/StartupsMtp/StartupsMtp.js";
import { LespepitestechServiceLogin } from "../Services/src/lespepitestech/Services/Login/Login.js";
import { LespepitestechServiceMain } from "../Services/src/lespepitestech/Services/Main/Main.js";
import { serviceName_entreprise_ } from "@/controller/scraping-services/Services/Config/entreprise_/config.js";
import { Entreprise_ServiceLogin } from "../Services/src/entreprise_/Services/Login/Login.js";
import { Entreprise_ServiceMain } from "../Services/src/entreprise_/Services/Main/Main.js";
import { serviceName_forinov } from "@/controller/scraping-services/Services/Config/forinov/config.js";
import { str_startupsOccitanie } from "../Services/src/forinov/Services/StartupsOccitanie/human-actions.js";
import { ForinovServiceMain } from "../Services/src/forinov/Services/Main/Main.js";
import { ForinovServiceLogin } from "../Services/src/forinov/Services/Login/Login.js";
import { ForinovServiceStartupsOccitanie } from "../Services/src/forinov/Services/StartupsOccitanie/StartupsOccitanie.js";
import { str_startupOccitanie } from "../Services/src/forinov/Services/StartupOccitanie/human-actions.js";
import { ForinovServiceStartupOccitanie } from "../Services/src/forinov/Services/StartupOccitanie/StartupOccitanie.js";

export const json_serviceRoute = {
    //#ADD NEW SERVICE HERE
    [serviceName_lespepitestech] :{
      [str_login]:LespepitestechServiceLogin,
      [str_main]:LespepitestechServiceMain,
      [str_startupsMtp]:LespepitestechServiceStartupsMtp,
    },
    [serviceName_entreprise_] :{
      [str_login]:Entreprise_ServiceLogin,
      [str_main]:Entreprise_ServiceMain,
    },
    [serviceName_forinov] :{
      [str_login]:ForinovServiceLogin,
      [str_main]:ForinovServiceMain,
      [str_startupsOccitanie]:ForinovServiceStartupsOccitanie,
      [str_startupOccitanie]:ForinovServiceStartupOccitanie,
    },
  }