import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const warnNoImages = () =>
  toast.warn('🦄 No more images!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });


export const noImagesFound = name =>
  toast.error(`No images found with this "${name}"!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });


export const earchEmpty = () =>
  toast.warn(`Write something in the search!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });


export const errorToastify = () =>
  toast.error(' An error has occurred, please try again!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });