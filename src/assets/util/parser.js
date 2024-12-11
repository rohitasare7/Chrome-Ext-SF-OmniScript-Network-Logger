export class NetworkParser {
    static safeParseJSON(str) {
        try {
            return typeof str === 'string' ? JSON.parse(str) : str;
        } catch (error) {
            console.error('JSON Parse Error:', error);
            return {};
        }
    }

    static parseMessageNode(formData) {
        try {
            const params = new URLSearchParams(decodeURIComponent(formData));
            const messageNode = params.get('message');
            return messageNode ? JSON.parse(messageNode) : null;
        } catch (error) {
            console.warn('Message parsing failed, likely not JSON format:', error);
            return null;
        }
    }

    static beautifyJSON(data) {
        try {
            return JSON.stringify(data, null, 4);
        } catch (error) {
            console.error('JSON beautification failed:', error);
            return 'N/A';
        }
    }
}