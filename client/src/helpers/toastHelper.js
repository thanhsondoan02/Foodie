import { toast } from 'react-toastify';

const config = {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

const toastNormal = (message) => {
  toast(message, config)
}

const toastSuccess = (message) => {
  toast.success(message, config)
}

const toastError = (message) => {
  toast.error(message, config)
}

export { toastNormal, toastError, toastSuccess }