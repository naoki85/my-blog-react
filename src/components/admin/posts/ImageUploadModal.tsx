import React, {useEffect} from 'react';
import Dropzone from "react-dropzone";
import {AnyAction, Dispatch} from "redux";
import {StoreState} from "../../../types/state";
import {ImageUploadActions} from "../../../actions/imageUpload";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import {Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export interface ImageUploadModalStateProps {
  filename: string;
  imageLoading: boolean;
  modalOpen: boolean;
  onCloseHandler: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  uploadArea: {
    width: 400,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'solid',
    borderRadius: 5,
    ":hover": {
      opacity: 0.5,
      backgroundColor: '#eee'
    }
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textWrapper: {
    margin: theme.spacing(3),
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const ImageUploadModal: React.FC<ImageUploadModalStateProps & { dispatch: Dispatch }> = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.modalOpen);

  useEffect(() => {
    setOpen(props.modalOpen)
  }, [props.modalOpen]);

  const handleOnDrop = (files: File[]) => {
    const dispatch = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    const target = files[0];
    dispatch(ImageUploadActions.uploadImage(target));
  };

  const handleClose = () => {
    props.onCloseHandler();
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <Dropzone
          onDrop={handleOnDrop}
          accept="image/*"
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()} className={classes.uploadArea}>
                <input {...getInputProps()} />
                {props.imageLoading ?
                  <p>Uploading ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
                }
              </div>
            </section>
          )}
        </Dropzone>
        <div className={classes.textWrapper}>
          {props.imageLoading ? "アップロード中です" : props.filename}
        </div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
