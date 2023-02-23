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
import { SearchAuditsBy, SortAuditsBy, SortDirection } from './';
/**
 *
 * @export
 * @interface AuditsRequest
 */
export interface AuditsRequest {
    /**
     *
     * @type {number}
     * @memberof AuditsRequest
     */
    pageSize?: number;
    /**
     *
     * @type {number}
     * @memberof AuditsRequest
     */
    pageNumber?: number;
    /**
     *
     * @type {SortAuditsBy}
     * @memberof AuditsRequest
     */
    sortBy: SortAuditsBy;
    /**
     *
     * @type {SortDirection}
     * @memberof AuditsRequest
     */
    sortDirection: SortDirection;
    /**
     *
     * @type {Array<SearchAuditsBy>}
     * @memberof AuditsRequest
     */
    filters?: Array<SearchAuditsBy>;
}
export declare function AuditsRequestFromJSON(json: any): AuditsRequest;
export declare function AuditsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuditsRequest;
export declare function AuditsRequestToJSON(value?: AuditsRequest | null): any;