export function escapeHtml(unsafe) {
    return text.replace(/[&<>"'`=\/]/g, function (char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#x60;',
            '=': '&#x3D;',
            '/': '&#x2F;'
        }[char];
    });
 }

 export default escapeHtml;