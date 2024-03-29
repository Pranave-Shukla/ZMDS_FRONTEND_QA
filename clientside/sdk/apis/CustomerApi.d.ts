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
import { CustomerDetailsResponse, CustomerPartialRequest, CustomersRequest, CustomersResponse } from '../models';
export interface GetCustomerDetailsRequest {
    id: string;
}
export interface GetCustomersRequest {
    customersRequest: CustomersRequest;
}
export interface UpdateCustomerRequest {
    id: string;
    customerPartialRequest: CustomerPartialRequest;
}
/**
 * CustomerApi - interface
 *
 * @export
 * @interface CustomerApiInterface
 */
export interface CustomerApiInterface {
    /**
     *
     * @summary Customer details
     * @param {string} id Customer ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApiInterface
     */
    getCustomerDetailsRaw(requestParameters: GetCustomerDetailsRequest): Promise<runtime.ApiResponse<CustomerDetailsResponse>>;
    /**
     * Customer details
     */
    getCustomerDetails(requestParameters: GetCustomerDetailsRequest): Promise<CustomerDetailsResponse>;
    /**
     *
     * @summary Customers list
     * @param {CustomersRequest} customersRequest Get customers request parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApiInterface
     */
    getCustomersRaw(requestParameters: GetCustomersRequest): Promise<runtime.ApiResponse<CustomersResponse>>;
    /**
     * Customers list
     */
    getCustomers(requestParameters: GetCustomersRequest): Promise<CustomersResponse>;
    /**
     *
     * @summary Customer details update
     * @param {string} id Customer ID
     * @param {CustomerPartialRequest} customerPartialRequest Updated customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApiInterface
     */
    updateCustomerRaw(requestParameters: UpdateCustomerRequest): Promise<runtime.ApiResponse<void>>;
    /**
     * Customer details update
     */
    updateCustomer(requestParameters: UpdateCustomerRequest): Promise<void>;
}
/**
 *
 */
export declare class CustomerApi extends runtime.BaseAPI implements CustomerApiInterface {
    /**
     * Customer details
     */
    getCustomerDetailsRaw(requestParameters: GetCustomerDetailsRequest): Promise<runtime.ApiResponse<CustomerDetailsResponse>>;
    /**
     * Customer details
     */
    getCustomerDetails(requestParameters: GetCustomerDetailsRequest): Promise<CustomerDetailsResponse>;
    /**
     * Customers list
     */
    getCustomersRaw(requestParameters: GetCustomersRequest): Promise<runtime.ApiResponse<CustomersResponse>>;
    /**
     * Customers list
     */
    getCustomers(requestParameters: GetCustomersRequest): Promise<CustomersResponse>;
    /**
     * Customer details update
     */
    updateCustomerRaw(requestParameters: UpdateCustomerRequest): Promise<runtime.ApiResponse<void>>;
    /**
     * Customer details update
     */
    updateCustomer(requestParameters: UpdateCustomerRequest): Promise<void>;
}
