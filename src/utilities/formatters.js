export const formatCurrency = (value) => {
    return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
