import {apiURL, localStorageItemName} from "../config/const";
import axios from "axios";

export class User {
  async Logout() {
    const token = localStorage.getItem(localStorageItemName);
    let mergedHeader = Object.assign({}, {});
    mergedHeader = Object.assign(mergedHeader, {
      Authorization: 'Bearer ' + token,
    });
    try {
      await axios.delete(`${apiURL}/logout`, {
        data: {},
        headers: mergedHeader,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    } finally {
      localStorage.setItem(localStorageItemName, '');
      window.location.href = '/admin/login';
    }
  }
}
