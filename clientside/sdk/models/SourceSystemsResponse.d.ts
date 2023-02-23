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
import { SourceSystem } from './';
/**
 *
 * @export
 * @interface SourceSystemsResponse
 */
export interface SourceSystemsResponse {
    /**
     *
     * @type {Array<SourceSystem>}
     * @memberof SourceSystemsResponse
     */
    sourceSystems?: Array<SourceSystem>;
}
export declare function SourceSystemsResponseFromJSON(json: any): SourceSystemsResponse;
export declare function SourceSystemsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SourceSystemsResponse;
export declare function SourceSystemsResponseToJSON(value?: SourceSystemsResponse | null): any;
