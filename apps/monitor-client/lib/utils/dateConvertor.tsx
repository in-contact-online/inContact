export function dateConvertor(dateStr: string): string {
    const result: RegExpMatchArray | null = dateStr.match(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
    return result ? `${result[1]} ${result[2]}` : 'Incorrect Date';
}
