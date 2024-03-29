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
import { PageInfo, Product } from './';
/**
 *
 * @export
 * @interface ProductsResponse
 */
export interface ProductsResponse {
    /**
     *
     * @type {PageInfo}
     * @memberof ProductsResponse
     */
    pageInfo?: PageInfo;
    /**
     *
     * @type {Array<Product>}
     * @memberof ProductsResponse
     */
    products?: Array<Product>;
}
export declare function ProductsResponseFromJSON(json: any): ProductsResponse;
export declare function ProductsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductsResponse;
export declare function ProductsResponseToJSON(value?: ProductsResponse | null): any;
