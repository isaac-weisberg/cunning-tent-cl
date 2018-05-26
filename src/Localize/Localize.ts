export class Localize {
    static shared: Localize = new Localize()

    get(key: string): string {
        return key
    }
}