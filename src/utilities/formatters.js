import { addSeconds, format, parseISO } from "date-fns";

export const formatDate = (date, formatStr = "MM/dd/yyyy") => {
    if (date) {
        return format(date, formatStr);
    }
    return "";
}

export const formatDateISOToDate = (dateISOFormat) => {
    if (dateISOFormat) {
        return format(parseISO(dateISOFormat), 'MM/dd/yyyy');
    }
    return "";
}

export const formatSecondsToDate = (seconds) => {
    if (seconds) {
        const date = addSeconds(new Date(0), seconds);
        return format(date, 'MM/dd/yyyy');
    }
    return "";
}
