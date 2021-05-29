import Swal from 'sweetalert2';

export const showSuccesAlert = (title: string, next: (finish: any) => void = () => {}) => {
    Swal.fire({
      icon: 'success',
      title,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      showClass: { popup: 'animate__animated animate__fadeInDown animate__faster' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' }
    }).then(next);
};

export const showWarningDeleteAlert = (title: string, text: string, next: (finish: any) => void = () => {}) => {
  Swal.fire({
    icon: 'warning',
    title,
    text,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Eliminar',
    confirmButtonColor: '#cf0000',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    showClass: { popup: 'animate__animated animate__fadeInDown animate__faster' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' }
  }).then(next);
};

export const showErrorAlert = (title: string, text: string, next: (finish: any) => void) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    showClass: { popup: 'animate__animated animate__fadeInDown animate__faster' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' }
  }).then(next);
};
