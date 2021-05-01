//formats date to YYYY-MM-DD of apollo Date type
export const formatDate = (date) => new Date(date).toISOString().slice(0, 10); 
