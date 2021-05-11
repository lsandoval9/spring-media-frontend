import { errorMessageDataI } from "../interfaces/errorMessageData.interface";

export const frequentErrors: { [name: string]: errorMessageDataI } = {
    selectImage: {
        message: "please select an image",
        severity: "warning",
    },

    fileToBig: {
        message: "please select a file smaller than 10MB",
        severity: "warning",
    },

    invalidMimetype: {
        message: "please select a valid image (JPG, WEBP or PNG)",
        severity: "danger",
    },
};
