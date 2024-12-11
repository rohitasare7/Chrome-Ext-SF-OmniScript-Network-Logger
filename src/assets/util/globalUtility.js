import toast from "./toast";

export const addToast = (toastText, toastType = 'Success') => {
    toast.add({
        message: {
            text: toastText,
            type: toastType,
        },
    });
};
