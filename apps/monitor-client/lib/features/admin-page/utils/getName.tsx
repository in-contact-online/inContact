export function getName(...params: any[]): string {
    let result = '';
    for (const param of params) {
        if (param) result += param;
    }
    return result;
}
