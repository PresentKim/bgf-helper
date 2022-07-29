export declare type SupportData = { dock: number, name: string, wave: number, chute: number, order: number };
export declare type OptionalSupportData = Partial<SupportData>

export function supportDataEquals(a: OptionalSupportData, b: OptionalSupportData) {
    return (
        (a.dock === undefined || b.dock === undefined || a.dock === b.dock) &&
        (a.name === undefined || b.name === undefined || a.name === b.name) &&
        (a.wave === undefined || b.wave === undefined || a.wave === b.wave) &&
        (a.chute === undefined || b.chute === undefined || a.chute === b.chute) &&
        (a.order === undefined || b.order === undefined || a.order === b.order)
    );
}

export function parseDataString(str: string): SupportData[] {
    /**
     *  ex) "416 242723 예제문자열점 5 27 528 3"
     *  => {dock: 416, name: "예제문자열점", wave: 5, chute: 27, order: 3}
     */
    return Array.from(str.matchAll(/(\d+)[\s|,]+\d+[\s|,]+([ㄱ-ㅎ가-힣\da-z]+)[\s|,]+(\d+)[\s|,]+(\d+)[\s|,]+\d+[\s|,]+(\d+)/ig))
        .map((match) => {
            return {
                dock: parseInt(match[1]),
                name: match[2],
                wave: parseInt(match[3]),
                chute: parseInt(match[4]),
                order: parseInt(match[5]),
            };
        })
}
