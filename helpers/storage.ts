type Keys = 'playlistId'
const storageKey = 'kpop-statistics'
export const storage = {
    get: (key: Keys) => {
        return localStorage.getItem(`${storageKey}-${key}`);
    },
    set: (key: Keys, value: string) => {
        localStorage.setItem(`${storageKey}-${key}`, value);
    },
}