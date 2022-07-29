import styles from '../DataTable/index.module.css';
import {GroupBy, setStore, SortBy, store} from "../../data/Store";

export default () => {
    const group = (value: GroupBy): (e: MouseEvent) => void => {
        return (e: MouseEvent) => {
            e.preventDefault();
            setStore("groupBy", value);
        }
    }
    const sort = (value: SortBy): (e: MouseEvent) => void => {
        return (e: MouseEvent) => {
            e.preventDefault();
            setStore("sortBy", store.sortBy === value ? null : value);
        }
    }
    return (
        <thead>
        <tr>
            <th class={styles.dock} onclick={group("dock")} oncontextmenu={sort("dock")}>배차도크</th>
            <th class={styles.name}>거점명</th>
            <th class={styles.wave} onclick={group("wave")} oncontextmenu={sort("wave")}>웨이브</th>
            <th class={styles.chute} onclick={group("chute")} oncontextmenu={sort("chute")}>슈트</th>
            <th class={styles.order} oncontextmenu={sort("order")}>기존순번</th>
        </tr>
        </thead>
    );
};
