"use strict";
/* tslint:disable */
/* eslint-disable */
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @export
 * @enum {string}
 */
var NullableBooleanValue;
(function (NullableBooleanValue) {
    NullableBooleanValue["TRUE"] = "TRUE";
    NullableBooleanValue["FALSE"] = "FALSE";
})(NullableBooleanValue = exports.NullableBooleanValue || (exports.NullableBooleanValue = {}));
function NullableBooleanValueFromJSON(json) {
    return NullableBooleanValueFromJSONTyped(json, false);
}
exports.NullableBooleanValueFromJSON = NullableBooleanValueFromJSON;
function NullableBooleanValueFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
exports.NullableBooleanValueFromJSONTyped = NullableBooleanValueFromJSONTyped;
function NullableBooleanValueToJSON(value) {
    return value;
}
exports.NullableBooleanValueToJSON = NullableBooleanValueToJSON;