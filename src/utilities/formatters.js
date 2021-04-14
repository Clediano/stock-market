import { format, parseISO } from "date-fns";

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const formatCurrency = (value) => {
    return formatter.format(value);
};

export const formatDate = (dateISOFormat) => {
    return format(parseISO(dateISOFormat), 'MM/dd/yyyy');
}