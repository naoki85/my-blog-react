import {ImageUploadActions, TypeKeys} from '../actions/imageUpload';
import {ImageUploadState} from "../types/state";

export const initialState: ImageUploadState = {
  filename: '',
  loading: false,
  result: '',
};

export default (state = initialState, action: ImageUploadActions) => {
  switch (action.type) {
    case TypeKeys.UPLOAD_IMAGE:
    case TypeKeys.UPLOAD_IMAGE_FAIL:
    case TypeKeys.UPLOAD_IMAGE_SUCCESS: {
      return { ...action.payload.data };
    }
    default: {
      return state;
    }
  }
};
