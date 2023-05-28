
export class StorageObserver {
    setCookie(name: string, value: string, expiryDays: number, path: string = '/') {
        const date = new Date();
        date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        const expires = '; expires=' + date.toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=' + path;
    }

    getCookie(name: string): string | null {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return null;
    }

    deleteAllCookies() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name.trim() + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    }
}