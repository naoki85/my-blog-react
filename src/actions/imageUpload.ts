import axios from 'axios';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';
import { apiURL, localStorageItemName } from '../config/const';
import {history} from "../index";
import { ImageUploadState } from '../types/state';

export enum TypeKeys {
  UPLOAD_IMAGE = 'UPLOAD_IMAGE',
  UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL',
}

const defaultRequestHeaders = {
  "content-type": "application/json"
};
const defaultRequestBody = {};

const uploadImageStart = (data: ImageUploadState) => createAction(TypeKeys.UPLOAD_IMAGE, { data });

const uploadImageSuccess = (data: ImageUploadState) =>
  createAction(TypeKeys.UPLOAD_IMAGE_SUCCESS, { data });

const uploadImageFail = (data: ImageUploadState) =>
  createAction(TypeKeys.UPLOAD_IMAGE_FAIL, { data });

const uploadImage = (file: File) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(uploadImageStart({
      result: '',
      loading: true,
      filename: '-',
    }));

    const newFilename = Date.now() + '_' + file.name;
    let mergedBody = Object.assign({}, defaultRequestBody);
    mergedBody = Object.assign(mergedBody, {filename: newFilename});
    const token = localStorage.getItem(localStorageItemName);
    let mergedHeader = Object.assign({}, defaultRequestHeaders);
    mergedHeader = Object.assign(mergedHeader, {
      Authorization: 'Bearer ' + token,
    });

    try {
      const response = await axios.put(`${apiURL}/upload`,
        JSON.stringify(mergedBody),
        { headers: mergedHeader });

      await axios.put(response.data.Url,
        file,
        { headers: {'Content-Type': file.type} });
      dispatch(uploadImageSuccess({
        result: 'success',
        loading: false,
        filename: newFilename,
      }));
    } catch (e) {
      if (e.response.status === 401) {
        // eslint-disable-next-line no-console
        console.log('logout action');
        localStorage.setItem(localStorageItemName, '');
        history.push('/admin/login');
      } else {
        dispatch(uploadImageFail({
          result: 'error',
          loading: false,
          filename: '-',
        }));
      }
    }
  };
};

export const DispatchActions = {
  uploadImageSuccess,
  uploadImageFail,
  uploadImageStart,
};
export const ImageUploadActions = {
  ...DispatchActions,
  uploadImage,
};
export type ImageUploadActions = ActionsUnion<typeof DispatchActions>;
