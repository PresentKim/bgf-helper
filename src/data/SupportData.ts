export declare type DataObj = { dock?: number, store?: number, name?: string, wave?: number, chute?: number, truck?: number, order?: number };

export default class SupportData {
    public dock: number = 0;
    public store: number = 0;
    public name: string = '';
    public wave: number = 0;
    public chute: number = 0;
    public truck: number = 0;
    public order: number = 0;

    constructor(dock?: number, store?: number, name?: string, wave?: number, chute?: number, truck?: number, order?: number) {
        if (dock !== undefined) this.dock = dock;
        if (store !== undefined) this.store = store;
        if (name !== undefined) this.name = name;
        if (wave !== undefined) this.wave = wave;
        if (chute !== undefined) this.chute = chute;
        if (truck !== undefined) this.truck = truck;
        if (order !== undefined) this.order = order;
    }

    public equals(obj: DataObj): boolean {
        return (
            (obj.dock === undefined || this.dock === obj.dock) &&
            (obj.store === undefined || this.store === obj.store) &&
            (obj.name === undefined || this.name === obj.name) &&
            (obj.wave === undefined || this.wave === obj.wave) &&
            (obj.chute === undefined || this.chute === obj.chute) &&
            (obj.truck === undefined || this.truck === obj.truck) &&
            (obj.order === undefined || this.order === obj.order)
        );
    }

    public serialize(): string {
        return `${this.dock},${this.store},${this.name},${this.wave},${this.chute},${this.truck},${this.order}`;
    }

    public static deserialize(str: string): SupportData | null {
        str = str.replaceAll(/[\s,|]+/g, ",");
        const parsedData = str.split(",");
        if (parsedData.length < 7) {
            return null;
        }
        try {
            return new SupportData(
                parseInt(parsedData[0]),
                parseInt(parsedData[1]),
                parsedData[2],
                parseInt(parsedData[3]),
                parseInt(parsedData[4]),
                parseInt(parsedData[5]),
                parseInt(parsedData[6]),
            );
        } catch (e) {
            return null;
        }
    }

    public static deserializeAll(str: string): SupportData[] {
        str = str.replaceAll(/[\s|]+/g, ",");

        const results: SupportData[] = [];
        for (let match of str.matchAll(/\d+,\d+,[ㄱ-ㅎ가-힣\da-z]+,\d+,\d+,\d+,\d+/ig)) {
            const data = SupportData.deserialize(match[0]);
            if (data !== null) {
                results.push(data)
            }
        }
        return results;
    }

    public static from(obj: DataObj): SupportData {
        return new SupportData(obj.dock, obj.store, obj.name, obj.wave, obj.chute, obj.truck, obj.order);
    }
}
