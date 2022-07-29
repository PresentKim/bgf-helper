import type {Component} from 'solid-js';
import {For} from "solid-js";
import styles from './App.module.css';
import DataTable from "./component/DataTable";
import HeaderTools from "./component/HeaderTools";
import {GroupBy, SortBy, store} from "./data/Store";
import {SupportData} from "./data/SupportData";

const App: Component = () => {
    const sortedData = (dataList: SupportData[], sortByList: SortBy[]) => {
        return Array.from(dataList).sort((a, b): number => {
            for (const sortBy of sortByList) {
                if (sortBy === null) {
                    continue;
                }
                const order = a[sortBy] - b[sortBy];
                if (order !== 0) {
                    return order;
                }
            }
            return 0;
        });
    }
    const groupedData = (dataList: SupportData[], groupBy: GroupBy) => {
        const map = new Map<number, SupportData[]>;
        for (const data of sortedData(dataList, [groupBy, store.sortBy])) {
            const groupKey = data[groupBy];
            map.set(groupKey, [...map.get(groupKey) ?? [], data]);
        }
        return Array.from(map.values());
    }

    return (
        <div class={styles.Container}>
            <HeaderTools/>
            <For each={groupedData(store.dataList, store.groupBy)}>{(recordList: SupportData[]) =>
                <DataTable rows={recordList}/>
            }</For>
        </div>
    );
};

export default App;
