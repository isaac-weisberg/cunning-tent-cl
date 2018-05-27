export default class CuntentError {
    underlyingError: any|null
    message: string

    constructor(msg: string, error: any|null = null) {
        this.underlyingError = null
    }
}