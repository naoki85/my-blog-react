import {apiURL, localStorageItemName} from "../config/const";
import axios from "axios";

export class User {
  async login(email: string): Promise<boolean> {
    let mergedBody = Object.assign({}, {});
    mergedBody = Object.assign(mergedBody, {email});
    try {
      const response = await axios.post(
        `${apiURL}/login`,
        JSON.stringify(mergedBody)
      );
      console.log(response.data);
      // localStorage.setItem(localStorageItemName, response.data);

      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);

      return false;
    }
  }

  async onetimeToken(email: string, token: string): Promise<boolean> {
    let mergedBody = Object.assign({}, {});
    mergedBody = Object.assign(mergedBody, {Email: email, OnetimeToken: token});
    try {
      const response = await axios.post(
        `${apiURL}/users/onetime_token`,
        JSON.stringify(mergedBody)
      );
      console.log(response.data);
      localStorage.setItem(localStorageItemName, response.data);

      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message);

      return false;
    }
  }

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
