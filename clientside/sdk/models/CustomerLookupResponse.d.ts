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
import { CustomerLookup } from './';
/**
 *
 * @export
 * @interface CustomerLookupResponse
 */
export interface CustomerLookupResponse {
    /**
     *
     * @type {CustomerLookup}
     * @memberof CustomerLookupResponse
     */
    customerLookup?: CustomerLookup;
}
export declare function CustomerLookupResponseFromJSON(json: any): CustomerLookupResponse;
export declare function CustomerLookupResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomerLookupResponse;
export declare function CustomerLookupResponseToJSON(value?: CustomerLookupResponse | null): any;
