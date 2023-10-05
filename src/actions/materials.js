/**
 * Action: MATERIALS
 * Author: Gary Balogh - 09/28/23
 */
import axios from 'axios';
import * as types from '../constants/materials';
import { ENDPOINTS } from '../utils/URL';

/**
 *  MIDDLEWARE
 */

/**
 * Post new material to project in db
 * @param {newMaterial}: object containing info from add material form
 * {
 *    projectId: string,
 *    material: string,
 *    invoice: string,
 *    unitPrice: number,
 *    currency: string,
 *    quantity: number,
 *    measurement: string,
 *    purchaseDate: date,
 *    shippingFee: number,
 *    taxRate: number,
 *    phone: string,
 *    link: string,
 *    description: string
 * }
 */
export const postNewMaterial = (newMaterial) => {
  return async dispatch => {
    const url = ENDPOINTS.BM_ADD_NEW_MATERIAL;
    let status = null;

    try {
      const res = await axios.post(url, {
        newMaterial,
        type: 'material'
      });
      status = res.status;
    } catch (err) {
      console.log("Error adding material");
    }
  };
};


/**
 * ACTIONS
 */

export const addNewMaterial = (payload, status) => {
  return {
    type: types.ADD_NEW_MATERIAL,
    payload,
    status,
  };
};