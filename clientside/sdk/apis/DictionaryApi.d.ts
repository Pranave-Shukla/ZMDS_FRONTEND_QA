/**
 * ZMDS API documentation
 * API documentation
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import * as runtime from '../runtime';
import { DictionariesResponse, Language } from '../models';
export interface GetDictionariesRequest {
    language: Language;
}
/**
 * DictionaryApi - interface
 *
 * @export
 * @interface DictionaryApiInterface
 */
export interface DictionaryApiInterface {
    /**
     *
     * @summary Dictionary list
     * @param {Language} language
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DictionaryApiInterface
     */
    getDictionariesRaw(requestParameters: GetDictionariesRequest): Promise<runtime.ApiResponse<DictionariesResponse>>;
    /**
     * Dictionary list
     */
    getDictionaries(requestParameters: GetDictionariesRequest): Promise<DictionariesResponse>;
}
/**
 *
 */
export declare class DictionaryApi extends runtime.BaseAPI implements DictionaryApiInterface {
    /**
     * Dictionary list
     */
    getDictionariesRaw(requestParameters: GetDictionariesRequest): Promise<runtime.ApiResponse<DictionariesResponse>>;
    /**
     * Dictionary list
     */
    getDictionaries(requestParameters: GetDictionariesRequest): Promise<DictionariesResponse>;
}
