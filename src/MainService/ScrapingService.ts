import config_pourdebon from "@/controller/scraping-services/Services/Config/pourdebon/config.js";
import { doServicePourdebon } from "@/controller/scraping-services/Services/src/pourdebon/PourdebonService.js";

//TODO 
/*
 const _scrapingService  :t_ScrapingServices = {
    //#ADD NEW SERVICE HERE
    [config_pourdebon.serviceName]: {
        [str_doService]: doServicePourdebon,
        [str_config] : config_pourdebon ,
        [str_routes] : ConfigPourdebonRoutes.df 
    }
} as const 

 //TODO : add configRoutes 
const ScrapingServices :ScrapingService<typeof _scrapingService> =new ScrapingService (_scrapingService) ;
  
export type t_config_scrapingService = typeof _scrapingService ;

type keyofJsonService = keyof t_config_scrapingService[keyof t_config_scrapingService]

export type getPropsFromServiceNamePropsName_2<SN extends t_serviceName_MainService , Props extends keyofJsonService> = t_config_scrapingService[SN][Props]

//TODO lot of type named getConfigFromServiceName
export type getConfigFromServiceName<SN extends t_serviceName_MainService> = getPropsFromServiceNamePropsName_2<SN,t_str_config> ;

export type getDoServiceFromServiceName<SN extends t_serviceName_MainService> = getPropsFromServiceNamePropsName_2<SN,t_str_doService> ;
export type getPropsFromServiceName_ServiceRoutes<SN extends t_serviceName_MainService> = getPropsFromServiceNamePropsName_2<SN,t_str_routes> ;


export default ScrapingServices ;*/