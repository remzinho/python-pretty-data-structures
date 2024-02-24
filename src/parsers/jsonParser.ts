export function prettifyAsJson(text: string, indentationSpaces: number): string {
    try {
        let obj = JSON.parse(text.replace(/'/g, '"')
            .replace(/True/g, 'true').replace(/False/g, 'false') // replace bool values
            .replace(/None/g, 'null')); // replace python None with JSON null
        return JSON.stringify(obj, null, indentationSpaces);
    } catch (error) {
        console.error('Error prettifying as JSON:', error);
        return text; // Return the original text if parsing fails
    }
}
