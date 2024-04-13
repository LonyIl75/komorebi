
import { getChildArr, rootClassName, t_getLeaf } from "@/utils/scraping/PageParsing/types.js";
import { MapRegexToIdPath, t_mapRegexToIdPathFromArrArr } from "@shared/m_regexMapping.js";
import { arrToUnion, ApplyGetElementNumberIArrArr, addSuffix, removePrefix } from "@shared/type.js";
import { pourdebon_login_rootClassName, pourdebon_login_mainOfComponents } from "./types.js";
import { ScrapingComponent } from "@/utils/scraping/PageParsing/ComponentObject.js";
import { Component } from "@/utils/scraping/PageParsing/Schema/Component/Component.js";
import {FunctionalWrapperJsonComponentConfig, IFunctionalWrapperJsonComponent}from "@/utils/scraping/PageParsing/Schema/FunctionalWrapperJsonComponents/IFunctionalWrapperJsonComponents.js";
import { fieldName_st_cst_buildFromFWJson, str_get_arrClassName } from "@/utils/scraping/PageParsing/Schema/FunctionalWrapperJsonComponents/JsonComponents/types.js";
import { _IJsonComponents } from "@/utils/scraping/PageParsing/Schema/FunctionalWrapperJsonComponents/_JsonComponents/_JsonComponents.js";
import { _IComponent, _Component } from "@/utils/scraping/PageParsing/Schema/_Component/_Component.js";
import { Selector, classProp, containOp, idProp } from "@/utils/scraping/PageParsing/Schema/primitives/Selector.js";
import { str_childs_selectors } from "@/utils/scraping/PageParsing/Schema/_Component/types.js";
import { getConfig } from "@shared/m_json.js";
import { getPourdebonHelpers } from "../../util/helpers.js";
import { fjson_pourdebon_utilMain } from "../../util/UtilMain/UtilMain.js";
import { t_arr_classNameType_pourdebon_utilText, t_union_classNameType_pourdebon_utilText, t_arr_pourdebon_utilText,t__IJsonComponents_pourdebon_utilText, fjson_pourdebon_utilText } from "../../util/UtilText/UtilText.js";

const arr_classNameType_pourdebon_login = [
    rootClassName,pourdebon_login_rootClassName,"LoginBody"
] as const  

export type t_arr_classNameType_pourdebon_login = typeof arr_classNameType_pourdebon_login

export type t_union_classNameType_pourdebon_login = arrToUnion<t_arr_classNameType_pourdebon_login>

const imported_classNameTypeParent_pourdebon_main =  [] as const
type t_imported_classNameTypeParent_pourdebon_main = typeof imported_classNameTypeParent_pourdebon_main

const imported_classNameTypeParent_pourdebon_text = [] as const
type t_imported_classNameTypeParent_pourdebon_text = typeof imported_classNameTypeParent_pourdebon_text


export const arr_pourdebon_login  = 
    [
        getChildArr<t_arr_classNameType_pourdebon_login,0,[1]>(arr_classNameType_pourdebon_login,0,[1]),
        getChildArr<t_arr_classNameType_pourdebon_login,1,[2]>(arr_classNameType_pourdebon_login,1,[2]),
        getChildArr<t_arr_classNameType_pourdebon_login,2>(arr_classNameType_pourdebon_login,2),
    ] as const

export type t_arr_pourdebon_login = typeof arr_pourdebon_login


type t_classNameType_leaf_pourdebon_login =  t_getLeaf < t_union_classNameType_pourdebon_login, t_arr_pourdebon_login> 

const imported_classNameType_pourdebon_main = [] as const 
type t_imported_classNameType_pourdebon_main = typeof imported_classNameType_pourdebon_main


const imported_classNameType_pourdebon_text = [] as const 
type t_imported_classNameType_pourdebon_text = typeof imported_classNameType_pourdebon_text

type _t_union_notSpecified_classNameType = 'Container' 

type t_classNameType_notSpecified_union_text = removePrefix<'Login',t_union_classNameType_pourdebon_login|_t_union_notSpecified_classNameType> extends infer A ?
 A extends string ? addSuffix <A,'Text'> extends infer B ? B : never : never :never 

type t_union_notSpecified_classNameType = _t_union_notSpecified_classNameType| t_classNameType_notSpecified_union_text

type t_classNameType_pourdebon_login = t_union_classNameType_pourdebon_login|t_imported_classNameType_pourdebon_main[number]|t_imported_classNameType_pourdebon_text[number]|t_union_notSpecified_classNameType
const pourdebon_login_helpers = getPourdebonHelpers<t_classNameType_pourdebon_login>()


const __IJsonComponents_leaf_pourdebon_login : _IJsonComponents<t_classNameType_leaf_pourdebon_login> = {
    [arr_classNameType_pourdebon_login[2]]:{
        childs_selectors : Component.df[str_childs_selectors],
    },
}
   
const __IJsonComponents_pourdebon_login : _IJsonComponents<t_union_classNameType_pourdebon_login> = {

    ...__IJsonComponents_leaf_pourdebon_login,

    [rootClassName]:{
        ...pourdebon_login_mainOfComponents
    },
    [pourdebon_login_rootClassName] :{
        childs_selectors : [
            [           
                Selector.cst_onePropAndTagg("",'',"main").toString(),
            ]
            ]
    },
}

export type t__IJsonComponents_pourdebon_login = typeof __IJsonComponents_leaf_pourdebon_login

const imported_fjson_pourdebon_utilMain = fjson_pourdebon_utilMain.getSubJsonComponent<t_imported_classNameType_pourdebon_main>(imported_classNameType_pourdebon_main)
const imported_fjson_pourdebon_login = imported_fjson_pourdebon_utilMain.getAddedSubJsonComponent< t_arr_classNameType_pourdebon_utilText,t_union_classNameType_pourdebon_utilText,t_arr_pourdebon_utilText,t__IJsonComponents_pourdebon_utilText,t_imported_classNameType_pourdebon_text>(imported_classNameType_pourdebon_text,fjson_pourdebon_utilText)

type t_imported_fjson_pourdebon_login = typeof imported_fjson_pourdebon_login

type t_arrClassName_import = t_imported_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <infer A , any , any ,any> ? A : never
type t_unionClassName_import = t_imported_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <any,infer A ,any, any >? A : never
type t_arrChilds_imported_login = t_imported_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <any,any,infer A , any >? A : never 
type t__IJsonComponent_imported_login = t_imported_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <any,any,any,infer A >? A : never

export const fjson_pourdebon_login  = imported_fjson_pourdebon_login[fieldName_st_cst_buildFromFWJson](
    new FunctionalWrapperJsonComponentConfig(arr_classNameType_pourdebon_login,arr_pourdebon_login,__IJsonComponents_pourdebon_login)
)

type t_fjson_pourdebon_login = typeof fjson_pourdebon_login


export type t_arrClassName_login = t_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <infer A , any , any ,any> ? A : never
export type t_unionClassName_login = t_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <any,infer A ,any, any >? A : never
export type t_arrChilds_login = t_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <any,any, infer A ,any >? A : never 
export type t_IJsonComponent_login = t_fjson_pourdebon_login extends IFunctionalWrapperJsonComponent <any,any,any,infer A >? A : never


export const configJson_pourdebon_login  = fjson_pourdebon_login[getConfig]()
export type t_configJson_pourdebon_login = typeof configJson_pourdebon_login

export const json_pourdebon_login  = fjson_pourdebon_login["toJson"]()
export type t_json_pourdebon_login = typeof json_pourdebon_login

const required_field = ["LoginBody"] as const 
const optional_field = [] as const
const pagination_field = [] as const

const arr_pathId = [...required_field,...optional_field,...pagination_field] as const 
type t_arr_pathId =  typeof arr_pathId
type t_path_id = t_arr_pathId[number]

export type t_resParsing = {
    [r_k in typeof required_field[number]] : string
} 
&{
    [key in t_path_id] ?: string
}

const _mapRegexPathIds_pourdebon_login = [
    [[rootClassName,pourdebon_login_rootClassName,["LoginBody"]]
    ,["LoginBody"]],
 ] as const 


const mapRegexPathIds_pourdebon_login = _mapRegexPathIds_pourdebon_login.map((e)=> [MapRegexToIdPath.convertArrKeyInRegexKey(e[0]),e[1]]) as unknown   as t_mapRegexToIdPathFromArrArr<t_path_id,t_arrClassName_login,typeof _mapRegexPathIds_pourdebon_login >
type t_mapRegexPathIds_pourdebon_login = typeof mapRegexPathIds_pourdebon_login

type t_unionRegex_mapRegexPathIds_pourdebon_login = arrToUnion<ApplyGetElementNumberIArrArr<[t_mapRegexPathIds_pourdebon_login],0>[0]>

const mapRegex_pourdebon_login = new MapRegexToIdPath<t_unionRegex_mapRegexPathIds_pourdebon_login,t_path_id,t_arrClassName_login,t_unionClassName_login>( {_arrClassname : fjson_pourdebon_login[str_get_arrClassName]()} , { _mapRegexToIdPath : mapRegexPathIds_pourdebon_login } ) 

export type t_unionRegex_mapRegex_pourdebon_login = typeof mapRegex_pourdebon_login extends MapRegexToIdPath<infer A , any , any, any  > ? A : never
export type t_unionIdPath_mapRegex_pourdebon_login = typeof mapRegex_pourdebon_login extends MapRegexToIdPath<any , infer A , any, any  > ? A : never


export const scrapingComponent_pourdebon_login = new ScrapingComponent<t_unionRegex_mapRegex_pourdebon_login,t_unionIdPath_mapRegex_pourdebon_login,t_arrClassName_login,t_unionClassName_login,t_arrChilds_login,t_IJsonComponent_login>( mapRegex_pourdebon_login , fjson_pourdebon_login  )
export type t_scrapingComponent_pourdebon_login = typeof scrapingComponent_pourdebon_login
