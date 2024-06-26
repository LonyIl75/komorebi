import { IJson, IVoid, isEmptyJson, isNotEmptyJson } from "@shared/m_object.js"
import { t_rules_base, PipelineBuilder  as _PipelineBuilder} from "@shared/m_pipeline.js"
import { _isNullOrUndefined, t_noReturnValue } from "@shared/m_primitives.js"
import { convertStrToRegexStr} from "@shared/m_regex.js"
import { NestedArray, arrToUnion, arr_url_attributeName, getIndexOfElement, joinCharKeyJson, removePrefix, reshapeObject, t_arr_url_attributeName, t_function, t_join_underscore, t_notFoundIdx } from "@shared/type.js"
import { ReqAndResType } from "../../../utils/Data/ReqResRoute.js"
import { AServiceRequest } from "../../../utils/Data/ServiceRoute.js"
import { getBrowsers, BrowsersPool, t_browserId, t_targetId } from "@/utils/browser/BrowsersPool.js"
import { getElmFromArrSelector, trySelectors_any, trySelectors_any_all, waitSelectors } from "@/utils/scraping/DOMElements/Selector/main.js"
import { base_getParsingTree, _buildParsingTree } from "@/utils/scraping/PageParsing/TreeParsing.js"
import { take_screenshot } from "@shared/str_debug.js"
import { t_page_fct_getMainComponent, t_page_fct_waitForPageFullLoading, waitForPageFullLoading } from "@/utils/scraping/DOMElements/page_selectors.js"
import { concatRouteNameClassName, t_arr_component, t_concatRouteNameClassName, t_getClassNameTypeFromArrComponent, t_removeConcatRouteNameClassName, t_rootClassName } from "@/utils/scraping/PageParsing/types.js"
import { selectors, t_ElementHN, t_pageOrElementHN, t_resSelector } from "@/utils/scraping/DOMElements/Selector/_Selector/type.js"
import { _IJsonComponents } from "@/utils/scraping/PageParsing/Schema/FunctionalWrapperJsonComponents/_JsonComponents/_JsonComponents.js"
import { hours, time } from "@shared/hours.js"
import { MapRegexToIdPath, date_field, pagination_field, t_pagination_field, t_required_field, t_union_required_field } from "@shared/m_regexMapping.js"
import { t_agreg_path, unjoin_pathRoutes } from "@shared/routePath.js"
import { NodeComponentValue, str_attributes } from "@/utils/scraping/PageParsing/Tree/NodeComponent.js"
import { f_clicking } from "@/utils/scraping/primitives/human_actions.js"
import { arrayOnlyIndices, convertToArray, isStrictArray } from "@shared/m_array.js"
import { t_df_arr_fct_name, str_getNextPage, t_str_getNextPage, str_transformAfterGetNextPage, str_nextPage, str_transformAfterNextPage, str_getLocalFunction, str_getServiceFunction, str_save_serviceFunction, str_transformAfterGetServiceFunction, getUrlToScrap, t_str_nextPage, getUrlToScrapItem } from "./types.js"
import { createSubJsonFromArrRegex, deepCloneJson, getSubsetKeysFromArrRegex } from "@shared/m_json.js"
import { getRootPropFromResValue, getRootPropFromValue, isGetValue, str_json_value, t_resValue } from "@/utils/scraping/PageParsing/Tree/TreeComponent.js"
import { embedBeginAndEndOfLineStrOrRegex } from "@shared/m_regex_prefixAndSuffix.js"
import { t_req_any, t_res_any } from "@/controller/scraping-services/class/constraints.js"
import { t_strRegex } from "@shared/_regexp.js"
import { getBodyUrlAndParamsReq } from "@shared/validate-url/functions.js"
import { t_url } from "@shared/validate-url/_types.js"

//TODO-IMP refactor

export type t_ha_res = Promise<(IJson<"url"|"date"|string>)>

export const nextCategories =["url","click","scroll"] as const
export type t_nextCategory = typeof nextCategories[number]

export type t_json_nextPage = {
    nextCategory : t_nextCategory,
    url :string ,
    url_toScrap:string,
    nexts : any[]
}

export type  t_IAHA_ServiceBase <RouteName extends string ,Req extends t_req_any , Res extends t_res_any,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>,  arr_fcts extends readonly string[] = t_df_arr_fct_name  > =  
{
    routeName : RouteName 
    getServiceParam (req:Req , res : Res):t_AHA_Service_Param<RouteName>

    [str_getServiceFunction] (req:Req , res : Res) : t_ha_res
    [str_getLocalFunction] (req:Req , res : Res) : t_ha_res
    [str_transformAfterGetServiceFunction] (req:Req , res : Res, json:Awaited<t_ha_res> ): ReqAndResType<Req, Res>
        

    getTree(...args:Parameters<t_AHA_Service_getTree<Req ,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>>):ReturnType<t_AHA_Service_getTree<Req ,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>>
    namesOfPipelineFunction (): arr_fcts
}

export type t_transformFromGet <Req extends t_req_any , Res extends t_res_any, F extends (( req:Req , res : Res  ) => t_ha_res) > = (req:Req , res : Res, json:Awaited<ReturnType<F>> ) => ReqAndResType<Req, Res>

export type _t_IAHA_ServiceGetTransform<Req extends t_req_any , Res extends t_res_any,T extends IJson<string,( req:Req , res : Res  ) => t_ha_res> > = 
T & {[k in keyof T as k extends string ? `transformAfter${Capitalize<k>}` :never ] :  t_transformFromGet<Req,Res,T[k]>}  

export type t_isNext <Arr extends  readonly string[] > = getIndexOfElement<t_str_getNextPage,Arr>

export type _t_IAHA_Service <RouteName extends string , Req extends t_req_any , Res extends t_res_any,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>,arr_HA_df_fct_name extends readonly string[] =t_df_arr_fct_name,arr_restFct extends readonly string[] =[] 
,_isNext extends boolean = t_isNext<[...arr_HA_df_fct_name,...arr_restFct]> extends t_notFoundIdx ? true : false 
> ={
    getNextPageParam (req:Req , res : Res):t_AHA_Service_ParamNextPage<RouteName>
        
    [str_save_serviceFunction]( req:Req , res : Res  ) : Promise<void>
    //A FAIRE : why no transform after save ? 
    //TODO extract type : duplicate between getNextPage and nextPage and all other future optional fct , type_fct for get opt , transform opt , action opt
} & (_isNext extends false ?IVoid:_t_IAHA_ServiceGetTransform<Req,Res,{
    [str_getNextPage] ( req:Req , res : Res  ) : t_ha_res
    [str_nextPage]( req:Req , res : Res  ) : Promise<t_json_nextPage>
}>)



export type  t_IAHA_Service <RouteName extends string , Req extends t_req_any , Res extends t_res_any,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>,  arr_fcts extends readonly string[] = t_df_arr_fct_name  > =  
_t_IAHA_Service<RouteName,Req,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T,arr_fcts> & t_IAHA_ServiceBase<RouteName,Req,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T,arr_fcts>

export type t_AHA_Service_Param<RouteName extends string> = {
    routeName:RouteName,
    url : string ,
    url_toScrap ?: string,
    browserId : t_browserId ,
    targetId : t_targetId ,

}

export type t_getLibPipeline<T , Arr extends readonly string[]> = 
    Arr extends readonly [infer Id , ... infer R ] ? R extends readonly string[] ? Id extends keyof T ? 
        T[Id] extends infer A ? A extends t_function ? 
        {[k in Id]:((this:T,...args:Parameters<A>)=>ReturnType<A>)} & t_getLibPipeline<T,R>
        : never : never 
    : never : never : {}



type _t_AHA_Service_ParamGetTree<RouteName extends string ,
BaseElement extends unionClassNameType ,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>
> = {routeName : RouteName,mapFilter?:MapRegexToIdPath<UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType>,prop_base_selectors:selectors,prop_base:BaseElement}

export type t_AHA_Service_ArgsGetTree<RouteName extends string , 
BaseElement extends unionClassNameType ,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>

> = 
{

    params: _t_AHA_Service_ParamGetTree<RouteName,BaseElement,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>,
    fct_loading:t_AHA_Service_FctLoadingGetTree
}


export type t_AHA_Service_getTree<Req extends t_req_any , Res extends t_res_any,_UnionRegex  extends t_strRegex ,_UnionIdPath  extends string , _ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],_unionClassNameType extends arrToUnion<_ArrUnionClassNameType> ,
_ArrArr extends t_arr_component<_unionClassNameType> ,  _T extends _IJsonComponents<_unionClassNameType>> = 
(<RouteName extends string , BaseElement extends unionClassNameType ,UnionRegex  extends _UnionRegex ,UnionIdPath  extends _UnionIdPath , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly (Exclude<_ArrUnionClassNameType[number],t_rootClassName>)[]] ,unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,ArrArr extends t_arr_component<unionClassNameType> & readonly (_ArrArr[number])[] ,  T extends _IJsonComponents< unionClassNameType> & {[k in keyof _T ]: _T[k]}> (req:Req,res:Res,args:reshapeObject<t_AHA_Service_ArgsGetTree<RouteName,BaseElement,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>>)=>ReturnType<typeof AHA_Service._getTree>)


export type t_AHA_Service_ParamGetTree<RouteName extends string , BaseElement extends unionClassNameType,  UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>> = t_AHA_Service_Param<RouteName> & _t_AHA_Service_ParamGetTree<RouteName,BaseElement,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>

export type t_AHA_Service_FctLoadingGetTree={
    waitForPageLoading : t_page_fct_getMainComponent ,  
    waitForPageFullLoading : t_page_fct_waitForPageFullLoading
}

export type t_AHA_Service_ParamNextPage<RouteName extends string> = t_AHA_Service_Param<RouteName> & {result:IJson , nexts:any[]}

type t__ParamSavePage<TSample extends IJson ,TDbName extends string , TColId extends keyof TSample , TColDate extends keyof TSample > = {
    database:{
        prismaClient: any,
        name: TDbName,
        id: TColId,
    },
    time : {
        date: TColDate,
        period: number
    },
    rows:TSample[]
}

export type t_AHA_Service_ParamSavePage<TSample extends IJson ,TDbName extends string , TColId extends keyof TSample , TColDate extends keyof TSample >  =  t__ParamSavePage<TSample , TDbName , TColId , TColDate> //t_AHA_Service_Param &

export abstract class AHA_ServiceBase<RouteName extends string , Req extends t_req_any , Res extends t_res_any,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>,arr_HA_df_fct_name extends readonly string[] =t_df_arr_fct_name,arr_restFct extends readonly string[] =[] > 
implements t_IAHA_ServiceBase<RouteName,Req,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T,readonly [...arr_HA_df_fct_name,...arr_restFct]>{
    routeName: RouteName

    abstract getServiceParam (req:Req , res : Res):t_AHA_Service_Param<RouteName>

    abstract getServiceFunction(req:Req , res : Res) : t_ha_res
    abstract getLocalFunction (req:Req , res : Res):t_ha_res
    abstract transformAfterGetServiceFunction (req:Req , res : Res, json:Awaited<t_ha_res> ) : ReqAndResType<Req, Res>

    abstract getTree(...args:Parameters<t_AHA_Service_getTree<Req ,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>>):ReturnType<t_AHA_Service_getTree<Req ,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>>

    abstract namesOfPipelineFunction(): readonly [...arr_HA_df_fct_name,...arr_restFct]

    getIdRequiredField(idField :t_removeConcatRouteNameClassName<RouteName,unionClassNameType> & t_union_required_field ){
        return concatRouteNameClassName(this.routeName,idField)
    }

    static getServiceParam <RouteName extends string ,Req extends t_req_any , Res extends t_res_any>(req:Req , res : Res):t_AHA_Service_Param<RouteName> {
        return {
            routeName : req.header.routeName,
            url:req.header.url,
            url_toScrap : req.header.url_toScrap,
            browserId : req.body.browserId,
            targetId:req.body.targetId
        }
    }
        

    static async _getTree< RouteName extends string , BaseElement extends unionClassNameType,  UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
    ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>>(
        param:t_AHA_Service_ParamGetTree<RouteName,BaseElement,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>,
        fct_loading : t_AHA_Service_FctLoadingGetTree
            ):Promise<any>{
        const url_toScrap = param.url_toScrap || param.url
        let mpage = await getBrowsers().then((brwsrsP:BrowsersPool)=>brwsrsP.getMPageFromTargetIdx(param.browserId,param.targetId))
        let page = mpage.page

        console.log("url_toScrap",url_toScrap)
        //TODO : extract in browserPage gotoPage and load
            if(!mpage.cur_url){
                await mpage.goto(url_toScrap)
                await time.timer(3000);
                await mpage.goto(url_toScrap.slice(0,url_toScrap.length-2))
                await time.timer(3000);
                await mpage.goto(url_toScrap)
                mpage.cur_url = url_toScrap
            }
            

            //if(!this.isLoaded)
                await page.mouse.move(0, 0);

                console.log( `waiting for first load : ${url_toScrap}` ) ;
                await fct_loading.waitForPageLoading(page)
            
                console.log( `waiting for fully load : ${url_toScrap}` ) ;
                await fct_loading.waitForPageFullLoading(page)

                await take_screenshot(page,"content_debug.png",1)
                await trySelectors_any(page,param.prop_base_selectors)
                //toggle(this.isLoaded)

        //TODO : Verify with hasexpose :
        /*await mpage.addExposeFunction(new ExposeFunction (null,"subsetPage",[],{path:joinFilePath(getPathPageParsing(),"subsetPage.js")}))
        await mpage.addExposeFunction(new ExposeFunction (null,"TreeParsing",[],{path:joinFilePath(getPathPageParsing(),"TreeParsing.js")}))
        if(!mpage.scriptFunctionMap.scriptMap.get("base_getParsingTree"))await mpage.page.exposeFunction("base_getParsingTree",base_getParsingTree)
        if(!mpage.scriptFunctionMap.scriptMap.get("_buildParsingTree"))await mpage.page.exposeFunction("_buildParsingTree",_buildParsingTree)*/
        //NOTE : expose is already done in initMPage (in BrowsersPools)
        let tree =  await base_getParsingTree<UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,BaseElement>(mpage,param.prop_base ,param.mapFilter, true )

        console.log("tree",tree)

        return tree 
    }

}
type _t_nextPaginationJson =IJson<t_arr_url_attributeName[number],string>


export type t_nextJson_selectedPagination<isBase extends boolean = false> =  string 

export type t_nextJson_nextPagination<isBase extends boolean = false,isEmbedded extends boolean = boolean,isGetValue extends boolean = boolean > =
t_resValue<t_pagination_field[0],isGetValue,(isBase extends true ?  string : `${number}`) > extends infer R ?
boolean extends isEmbedded ? {[k in t_pagination_field[0]] :R} | R : isEmbedded extends true ? {[k in t_pagination_field[0]] :R} : R 
: never

   
export type t_nextJson<isBase extends boolean = false,isSingleNext extends boolean = boolean , isGetValue extends boolean = boolean > = 
(boolean extends isSingleNext ? [t_nextJson_nextPagination<isBase,false, isGetValue>] | t_nextJson_nextPagination<isBase,true, isGetValue>[] : isSingleNext extends true ? [t_nextJson_nextPagination<isBase,false, isGetValue>] : t_nextJson_nextPagination<isBase,true, isGetValue>[] ) extends infer R ? 
{[k in t_pagination_field[0]] : R } & {[k in t_pagination_field[1]] :t_nextJson_selectedPagination<isBase>} : never 




//t_IAHA_Service<Req,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T,readonly [...arr_HA_df_fct_name,...arr_restFct]>
export abstract class AHA_Service<RouteName extends string ,Req extends t_req_any , Res extends t_res_any,UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>,arr_HA_df_fct_name extends readonly string[] =t_df_arr_fct_name,arr_restFct extends readonly string[] =[] > 
extends  AHA_ServiceBase<RouteName,Req,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T,readonly [...arr_HA_df_fct_name,...arr_restFct]> implements t_IAHA_ServiceBase<RouteName,Req,Res,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T,readonly [...arr_HA_df_fct_name,...arr_restFct]>   {
        
        routeName: RouteName

        static _nextsJson (_json :t_nextJson<true>) {
            const selected_pagination = _json[pagination_field[1]]
            const nextPagination = _json[pagination_field[0]]

            let _nextPagination_values = nextPagination
            if(_nextPagination_values.length > 1){
                let nextPagination_values = _nextPagination_values as t_nextJson<true,false>[t_pagination_field[0]]
                const json = _json as t_nextJson<true,false>
                const limit = parseInt(getRootPropFromValue(pagination_field[1],json as any ))//TODO 
                
                nextPagination_values = nextPagination_values.filter((element)=>{
                    const prop = pagination_field[0]
                    if(element.hasOwnProperty(prop)){
                        const json_value = getRootPropFromValue(prop,element)
                        return /^\d+$/.test(json_value) &&  parseInt(json_value) > limit
                    }
                    return false 
                })
                nextPagination_values = nextPagination_values.sort(function(a:t_nextJson_nextPagination<true,true>, b :t_nextJson_nextPagination<true,true>) {
                    const a_val = parseInt(getRootPropFromValue(pagination_field[0],a))
                    const b_val = parseInt(getRootPropFromValue(pagination_field[0],b))
                    return a_val - b_val
                });
                _nextPagination_values = nextPagination_values
            }else {
                let nextPagination_values = _nextPagination_values as t_nextJson<true,true>[t_pagination_field[0]]
                _nextPagination_values =[{[pagination_field[0]] :nextPagination_values[0]}]
                _nextPagination_values = nextPagination_values
            }

            return {[pagination_field[0]]:_nextPagination_values, [pagination_field[1]]:selected_pagination} as t_nextJson<false>


        }

        static _bodyNextsJson(json:IJson,nextPaginationKey : string , selectedPaginationKey : string){
            let _nextPagination = {} as any   
                            
            if(isStrictArray(json[nextPaginationKey])){                                                             
                _nextPagination = json[nextPaginationKey] as t_nextJson_nextPagination<true>[]
            }else {
                //IMP : regex is \S+ to include href,aria-label, etc AND custom attribute wich can be any string 
                //type doesnt reflect this aspect , typing is just a taste of what the object should be and not a strict typing
                const _obj = createSubJsonFromArrRegex(json,[new RegExp(NodeComponentValue.getNameFieldOfJsonStoredValue(pagination_field[0]+"(?:","\\S+)?"))])
                _nextPagination = [_obj as t_nextJson_nextPagination<true>]
            }                                                                                                       
            
            return AHA_Service._nextsJson(
                {
                    ...deepCloneJson({[pagination_field[0]]:_nextPagination//TODO: as t_nextJson_nextPagination<true>[] 

                    }) 
                    , ...deepCloneJson({[pagination_field[1]]:(json[pagination_field[1]] as t_nextJson_selectedPagination<true>)})
                })[pagination_field[0]]
        }
        static async _getNextPage <  RouteName extends string,BaseElement extends unionClassNameType,  UnionRegex  extends t_strRegex ,UnionIdPath  extends string , ArrUnionClassNameType extends  readonly [t_rootClassName,... readonly string[]],unionClassNameType extends arrToUnion<ArrUnionClassNameType> ,
        ArrArr extends t_arr_component<unionClassNameType> ,  T extends _IJsonComponents< unionClassNameType>>( param:t_AHA_Service_ParamGetTree<RouteName,BaseElement,UnionRegex,UnionIdPath,ArrUnionClassNameType,unionClassNameType,ArrArr,T>, fct_loading : t_AHA_Service_FctLoadingGetTree){


            type t_1 = UnionRegex
            type t_2 = UnionIdPath
            type t_3 = readonly[ t_rootClassName , ...readonly (Exclude<ArrUnionClassNameType[number],t_rootClassName>)[]]
            type t_4 = unionClassNameType
            type t_5 =   readonly (ArrArr[number])[]
            type t_6 =  {[k in keyof T ]: T[k]}

            const _nextPageId = concatRouteNameClassName(param.routeName,pagination_field[0])
            const nextPageId = _nextPageId as typeof _nextPageId & unionClassNameType  //TODO 

            let mpage = await getBrowsers().then((brwsrsP:BrowsersPool)=>brwsrsP.getMPageFromTargetIdx(param.browserId,param.targetId))
            const url_toScrap = param.url_toScrap || param.url

            const scrapingComponent  = mpage.getScrapingComponent()
            const mapPathPatternToId : MapRegexToIdPath<UnionRegex, UnionIdPath,ArrUnionClassNameType,unionClassNameType> = scrapingComponent.getMapPathPatternToId()
            const paths_to_nextComponent  = scrapingComponent.getFwJsonComponent().findPathOfIdComponent(nextPageId)
            
            for( const _path_to_nextComponent of paths_to_nextComponent){
                const path_to_nextComponent = _path_to_nextComponent as t_agreg_path<unionClassNameType>
                let _res =  MapRegexToIdPath.arrPathToPathId<UnionRegex, UnionIdPath,ArrUnionClassNameType,unionClassNameType> (mapPathPatternToId,path_to_nextComponent,nextPageId)
                if(_isNullOrUndefined(_res)) continue 
                let regex_idx = [_res.regex_idx]
                while(!_isNullOrUndefined(_res)){
                    _res = MapRegexToIdPath.arrPathToPathId<UnionRegex, UnionIdPath,ArrUnionClassNameType,unionClassNameType> (mapPathPatternToId,path_to_nextComponent,nextPageId,_res.regex_idx+1)
                    if(!_isNullOrUndefined(_res))regex_idx.push(_res.regex_idx)
                }
                const new_arr_regex = arrayOnlyIndices(mapPathPatternToId.mapRegexToIdPath as NestedArray<any> ,regex_idx)
                const new_map_regex = new MapRegexToIdPath<t_1,t_2,any,t_4>( {_arrClassname :unjoin_pathRoutes<unionClassNameType>(path_to_nextComponent).slice(1) } , { _mapRegexToIdPath : new_arr_regex } ) 
    
                
                const tree = await AHA_Service._getTree<RouteName,BaseElement,t_1,t_2,any,t_4,t_5,t_6>({
                    ...param,
                    mapFilter:new_map_regex
                },fct_loading)
    
                //A FAIRE EXTRACT : 
                const _date = hours.getTimeNow()
                let json = tree.getJsonValue(mapPathPatternToId,undefined , true ).res_childs as any
                return {[url_toScrap]:{url:url_toScrap ,...json,date : _date}}
    
            }
        }

        static getNextPageParam <RouteName extends string,Req extends t_req_any , Res extends t_res_any>(req:Req , res : Res):t_AHA_Service_ParamNextPage<RouteName> {
            return {
                ...this.getServiceParam(req,res),
                result : res.body.result,
                nexts : res.body.nexts
            }
        }
        
        //A FAIRE : refactor see if part isnt be better in another file and also be static // this nextPage is only relevant for not scrolling next => enum.next => [scroll , click , goto ]
        static async _nextPage<RouteName extends string >(param:t_AHA_Service_ParamNextPage<RouteName>){
            const nexts =param.nexts
            if(_isNullOrUndefined(nexts))throw Error(`No nexts ${nexts}`)


            let mpage = await getBrowsers().then((brwsrsP:BrowsersPool)=>brwsrsP.getMPageFromTargetIdx(param.browserId,param.targetId))
            const page = mpage.page

            let  res_nextPagenextPage :t_json_nextPage= {} as any 
            
            const keys_attribute_url = arr_url_attributeName.map((url_attributeName)=>NodeComponentValue.getNameFieldOfJsonStoredValue(pagination_field[0],url_attributeName))
            const regex_keys_attribute_url = keys_attribute_url.map((key_attribute_url)=>{return new RegExp(embedBeginAndEndOfLineStrOrRegex(convertStrToRegexStr(key_attribute_url),true))})
            
            for (const _nodeComponentValue of nexts){
                const nodeComponentValue = _nodeComponentValue[pagination_field[0]]
                const json_attribute_url = createSubJsonFromArrRegex<string,IJson<string,string>>(nodeComponentValue[str_json_value],regex_keys_attribute_url)

                if(isNotEmptyJson(json_attribute_url)) {
                    let success_goto = false
                    let url = mpage.cur_url
                    const urls = Object.values(json_attribute_url)
                    for(let i = 0 ; i<urls.length && !success_goto;i++){
                        url = urls[i]
                        success_goto = await mpage.goto(url).then(()=>true).catch(()=>false)
                    }
                    if(success_goto) {//throw new Error(`No url found for ${nodeComponentValue.description}`)
                        const url_toScrap = url
                        res_nextPagenextPage = {nexts:[],nextCategory :nextCategories[0],url,url_toScrap} //A FAIRE : nexts:nexts.pop()
                        break
                    }
                }   
                if(nodeComponentValue.description.length>0 && nodeComponentValue.description[0].length>0){
                    const elements :t_ElementHN[] = await NodeComponentValue.getElmOfNodeComponentValue(nodeComponentValue,page)
                    if(elements.length>0){
                        const url = mpage.cur_url
                        await f_clicking(elements[0])
                        const url_toScrap = getUrlToScrap(url,param.result)
                        res_nextPagenextPage = {nexts:[],nextCategory :nextCategories[1],url,url_toScrap}//A FAIRE : nexts:nexts.pop()
                        break
                    }
                }

            }
        return res_nextPagenextPage //TODO update nexts and find a way to reuse it instead of calling getNextPage for exammple if res.body.nexts then ret = res.body.nexts else ret = await getNextPage(req,res) 

        }
        
        /*
        TODO-IMP: allow to retrieve strId , only with db name :
            - create config type
            - create config for each ScrapingSchema (arrClassname,?arrArrChild,) and (arrIdPath:(next,id,[required,opt]))
            - jsonMain for each service
            - specify config type with constraint  
            - implement config with _IJsonComponents and mapRegexToIdPath/mapFilter
            - jsonMain for each service 
        */
       //static getSavePageParam <Req extends t_req_any , Res extends t_res_any>(req:Req , res : Res):t_AHA_Service_ParamSavePage
        static getSavePageParam<TSample extends IJson ,TDbName extends string , TColId extends keyof TSample , TColDate extends keyof TSample >(db_prismaClient : any , db_name : TDbName ,db_id : TColId , time_db_date :TColDate , rows: TSample[] , time_period : ReturnType<typeof  hours.getTimeNow> ):t_AHA_Service_ParamSavePage<TSample , TDbName , TColId , TColDate>{
            return {
                //...this.getServiceParam(req,res),
                database:{
                    prismaClient:db_prismaClient,
                    name: db_name,
                    id: db_id,
                },
                time : {
                    date: time_db_date,
                    period:time_period 
                },
                rows:rows,
            }
        }

        static async _save_serviceFunction <TSample extends IJson ,TDbName extends string , TColId extends keyof TSample , TColDate extends keyof TSample >(param : t_AHA_Service_ParamSavePage<TSample , TDbName , TColId , TColDate>){
                        
            const {prismaClient,name:database_name ,id:strId} = param.database
            const {date:strDate,period} = param.time
            const {rows} = param

            type T_id = TSample[TColId] 
            const arr_productType = rows.map((sample)=>sample[strId]) as T_id[] 

            const arr_existingSamples : TSample[] = await prismaClient[database_name].findMany({
                where: {
                [strId]: {
                    in: arr_productType,
                },
                },
            })
            
            // For a quick lookup
            let existingSamples : {[k in T_id]:TSample}=  {} as any 
            
            arr_existingSamples.reduce((_existingSamples,_existingSample) => 
            { 
                const id : string = _existingSample[strId]
                if(!_existingSamples.hasOwnProperty(id))_existingSamples[id]=_existingSample
                else throw Error(`id ${id} is duplicate`)
                return _existingSamples
            }
            ,existingSamples)
            
            let createAndUpdateArr: {update:TSample[],create:TSample[]} = {update:[],create:[]}

            createAndUpdateArr = rows.reduce((_createAndUpdateArr,sample) => {
                const existingSample = existingSamples[sample[strId]]
                if(existingSample ){
                    if(_isNullOrUndefined(period) || existingSample[strDate] + period >= sample[strDate] ){
                        _createAndUpdateArr["update"].push(sample)
                    }
                }else {
                    _createAndUpdateArr["create"].push(sample)
                }
                return _createAndUpdateArr
            },createAndUpdateArr)

            const promise_create = [
                createAndUpdateArr["create"].length ? 
                prismaClient[database_name].createMany({data: createAndUpdateArr["create"]}) 
                : Promise.resolve()
            ]

            const promise_update = createAndUpdateArr["update"].length ? createAndUpdateArr["update"].map((sample)=>
                prismaClient[database_name].update({
                        where: {
                            [strId]: sample[strId],
                        },
                        data: sample,
                    })
            ) : [Promise.resolve()]
            //TODO-IMP createMany dont work in SQLite 
            return Promise.all([...promise_create,...promise_update])

        }

        static embedItems <T extends IJson ,TUrl extends string , ItemField extends string  >(_json:T,url_toScrap:TUrl,item_field:ItemField){
            let json = _json[url_toScrap]
            const _date = _json[date_field]
            const {bodyUrl,paramsUrl} = getBodyUrlAndParamsReq(url_toScrap)
            //TODO extract add req_param 
            json[item_field]= json[item_field].reduce((acc,e,idx)=>{return {...acc, [getUrlToScrapItem(bodyUrl,paramsUrl,idx)]:{...e,[date_field] : _date}}},{})//A FAIRE : extract 
            delete json[date_field]
            return json
            
        }
     
}



