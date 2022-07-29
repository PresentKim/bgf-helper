import {createEffect} from 'solid-js';
import {createStore} from 'solid-js/store';
import {SupportData} from './SupportData';

export const groupBy = ['dock', 'chute', 'wave'] as const;
export const sortBy = [...groupBy, 'order', null] as const;
export declare type GroupBy = typeof groupBy[number];
export declare type SortBy = typeof sortBy[number];
export declare type StoreSchema = {
    groupBy: GroupBy
    sortBy: SortBy
    sortAscending: boolean
    dataList: SupportData[]
}

const localState = localStorage.getItem('store');
export const [store, setStore] = createStore<StoreSchema>(
    localState ? JSON.parse(localState) : {
        groupBy: 'dock',
        sortBy: null,
        sortAscending: false,
        dataList: [],
    }
);
createEffect(() => localStorage.setItem('store', JSON.stringify(store)));
