function base64ToArrayBuffer(base64: string) {
    const binary_string = atob(base64)
    const bytes = new Uint8Array(binary_string.length)
    for (let i=0; i < binary_string.length; i++) {
        bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
}

export default base64ToArrayBuffer