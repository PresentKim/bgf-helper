export const GroupBy = ["dock", "chute", "wave"] as const;
export const SortBy = [...GroupBy, "order"] as const;
export declare type ViewOption = {
    group: typeof GroupBy
    sort: typeof SortBy
    filter: {
        dock: number[]
        chute: number[]
        wave: number[]
    }
};