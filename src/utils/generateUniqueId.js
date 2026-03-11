const DEFAULT_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function getRandomChar(chars) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return chars[array[0] % chars.length];
}

function generateSegment(length, chars) {
    return Array.from({ length }, () => getRandomChar(chars)).join("");
}

export function generateUniqueId({
    segments = 3,
    segmentLength = 4,
    maxRetries = 5,
    compareWith = [],
    chars = DEFAULT_CHARS
    } = {}) {

        for (let attempt = 0; attempt < maxRetries; attempt++) {

            const id = Array.from({ length: segments }, () =>
                generateSegment(segmentLength, chars)
            ).join("-");

            const exists = compareWith.some(item => item.id === id);

            if (!exists) return id;
        }

    throw new Error("No se pudo generar un ID único.");
}