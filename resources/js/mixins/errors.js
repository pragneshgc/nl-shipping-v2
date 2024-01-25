const reportError = (error) => {
  let audio = new Audio('/audio/alarm.mp3');
  audio.play();

  Swal.fire({
    position: 'bottom',
    icon: 'error',
    title: 'Error fetching data!',
    showConfirmButton: false,
    timer: 5000,
    toast: true,
    text: 'Try refreshing your page, we will notify the developers.',
  }).then(() => {
    console.warn(error.response);
  });
};

const postError = (error) => {
  let audio = new Audio('/audio/alarm.mp3');
  audio.play();

  Swal.fire({
    position: 'bottom',
    icon: 'error',
    title: 'Whoops!',
    showConfirmButton: false,
    timer: 5000,
    toast: true,
    text: error,
  }).then(() => {
    console.warn(error);
  });
}

const postErrorPopup = (error) => {
  let audio = new Audio('/audio/alarm.mp3');
  audio.play();

  Swal.fire({
    icon: 'error',
    title: 'Whoops!',
    showConfirmButton: false,
    html: error,
    showConfirmButton: true,
  }).then((result) => {
    console.warn(result);
  });
}

const postSuccess = (response) => {
  Swal.fire({
    position: 'bottom',
    icon: 'success',
    title: 'Success!',
    showConfirmButton: false,
    timer: 5000,
    //timer: 9999999999999999,
    toast: true,
    text: response,
  });
}

const reportErrorToast = function (error) {
  let audio = new Audio('/audio/alarm.mp3');
  audio.play();

  toast.show(error,
    {
      type: 'error',
      iconPack: 'fontawesome',
      icon: 'exclamation',
      duration: 5000,
      position: "top-right",
      action: {
        text: 'Dismiss',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      },
    }
  )
}

const postErrorToast = (error) => {
  let audio = new Audio('/audio/alarm.mp3');
  audio.play();

  toast.show(error,
    {
      type: 'error',
      iconPack: 'fontawesome',
      icon: 'exclamation',
      duration: 5000,
      position: "top-right",
      action: {
        text: 'Dismiss',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      },
    }
  )
}

const postSuccessToast = (response) => {
  if (response == '') {
    response = 'Success!'
  }

  toast.show(response,
    {
      iconPack: 'fontawesome',
      type: 'success',
      icon: 'check',
      duration: 2000,
      position: "top-right",
      action: {
        text: 'Dismiss',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      },
    }
  )
}

export {
  reportError,
  postError,
  postErrorPopup,
  postSuccess,
  reportErrorToast,
  postErrorToast,
  postSuccessToast
}
