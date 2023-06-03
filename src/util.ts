function arrayify<T = unknown>(obj: T) {
    return obj instanceof Array
        ? obj
        : [obj]
}

function nullify<T = unknown>(value: T) {
    return (value && (value as unknown[]).length)
        ? value
        : null
}

export { arrayify, nullify }
