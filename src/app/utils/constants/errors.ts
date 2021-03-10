import { errorDialogData } from "../interfaces/errorDialogData.interface";



const FILE_TOO_BIG_ERROR: errorDialogData = {

    status: "File too big",

    message: "Please provide an image smaller than 10 MB",

    date: new Date()

} 

export const ERRORS = {

    FILE_TOO_BIG_ERROR

}