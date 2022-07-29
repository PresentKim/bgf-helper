import type {Component} from 'solid-js';
import {For} from "solid-js";
import styles from './App.module.css';
import SupportData from "./data/SupportData";
import Store, {setUrlSearchParam} from "./data/Store";
import DataTable from "./component/DataTable";
import HeaderTools from "./component/HeaderTools";
import {store} from "./data/Store";
import {SupportData} from "./data/SupportData";

const App: Component = () => {

    const sortedData = () => {
        return Array.from(store.dataList).sort((a, b) => {
            return store.sortBy === null ? 0 : a[store.sortBy] - b[store.sortBy]
        });
    }
    const groupedData = () => {
        const map = new Map<number, SupportData[]>;
        for (const data of sortedData()) {
            const groupKey = data[store.groupBy];
            map.set(groupKey, [...map.get(groupKey) ?? [], data]);
        }
        return Array.from(map.values());
    }

    return (
        <div class={styles.Container}>
            <HeaderTools/>
            <For each={groupedData()}>{(recordList: SupportData[]) =>
                <DataTable rows={recordList}/>
            }</For>
        </div>
    );
};

export default App;
