import {createEffect} from 'solid-js';
import {createStore} from 'solid-js/store';
import SupportData from './SupportData';
import {SetStoreFunction, Store} from "solid-js/store/types/store";

export const GroupBy = ['dock', 'chute', 'wave'] as const;
export const SortBy = [...GroupBy, 'order', null] as const;
export declare type UrlParams = {
    groupBy: typeof GroupBy[number]
    sortBy: typeof SortBy[number]
    sortAscending: boolean
    filter: {
        dock: number[]
        name: string
        chute: number[]
        wave: number[]
    }
    dataList: SupportData[]
}

const [state, setState] = createStore({
    groupBy: JSON.parse(getUrlSearchParam('groupBy') ?? '"dock"'),
    sortBy: JSON.parse(getUrlSearchParam('sortBy') ?? 'null'),
    sortAscending: JSON.parse(getUrlSearchParam('sortAscending') ?? 'false'),
    filter: JSON.parse(getUrlSearchParam('filter') ?? '{}'),
    dataList: SupportData.deserializeAll(getUrlSearchParam('dataList') ?? ''),
} as UrlParams);

export default [state, setState] as [get: Store<UrlParams>, set: SetStoreFunction<UrlParams>];
createEffect(() => {
    for (const [key, value] of Object.entries(state)) {
        setUrlSearchParam(key, JSON.stringify(value));
    }
    setUrlSearchParam("dataList", state.dataList.map((data)=>data.serialize()).join(","));
});

export function getUrlSearchParam(name: string): string | null {
    return new URLSearchParams(document.location.search).get(name);
}

export function setUrlSearchParam(name: string, value: string): void {
    const params = new URLSearchParams(document.location.search);
    params.set(name, value);

    history.pushState({}, '', '?' + params.toString());
}
