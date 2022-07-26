import {For} from "solid-js";
import SupportData from "../../data/SupportData";
import styles from './index.module.css';
import DataTableHead from "../DataTableHead";
import Store from "../../data/Store";
import {produce} from "solid-js/store";

export default (props: { rows: SupportData[] }) => {
    const {rows} = props;
    const [store, setStore] = Store;

    return (
        <table class={styles.DataTable}>
            <DataTableHead/>
            <tbody>
            <For each={rows}>{(data: SupportData, i) =>
                <tr oncontextmenu={(e) => {
                    e.preventDefault();
                    setStore(
                        produce((params) => {
                            const index = params.dataList.findIndex(data.equals.bind(data));
                            params.dataList.splice(index, 1);
                        })
                    );
                }}>
                    <td class={styles.dock}>{data.dock}</td>
                    <td class={styles.store}>{data.store}</td>
                    <td class={styles.name}>{data.name}</td>
                    <td class={styles.wave}>{data.wave}</td>
                    <td class={styles.chute}>{data.chute}</td>
                    <td class={styles.truck}>{data.truck}</td>
                    <td class={styles.order}>{data.order}</td>
                </tr>
            }</For>
            </tbody>
        </table>
    );
};
