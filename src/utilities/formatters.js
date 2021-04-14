import { addSeconds, format, parseISO } from "date-fns";

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const formatCurrency = (value) => {
    return formatter.format(value);
};

export const formatDateISOToDate = (dateISOFormat) => {
    return format(parseISO(dateISOFormat), 'MM/dd/yyyy');
}

export const formatSecondsToDate = (seconds) => {
    const date = addSeconds(new Date(0), seconds);
    return format(date, 'MM/dd/yyyy');
}