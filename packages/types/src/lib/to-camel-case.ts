export const toCamelCase = (str: string) =>
    str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
