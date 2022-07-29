import {For} from "solid-js";
import styles from './index.module.css';
import DataTableHead from "../DataTableHead";
import {setStore} from "../../data/Store";
import {produce} from "solid-js/store";
import {SupportData, supportDataEquals} from "../../data/SupportData";

export default (props: { rows: SupportData[] }) => {
    const {rows} = props;

    return (
        <table class={styles.DataTable}>
            <DataTableHead/>
            <tbody>
            <For each={rows}>{(data: SupportData) =>
                <tr oncontextmenu={(e) => {
                    e.preventDefault();
                    setStore(
                        produce((params) => {
                            const index = params.dataList.findIndex(supportDataEquals.bind(null, data));
                            params.dataList.splice(index, 1);
                        })
                    );
                }}>
                    <td class={styles.dock}>{data.dock}</td>
                    <td class={styles.name}>{data.name}</td>
                    <td class={styles.wave}>{data.wave}</td>
                    <td class={styles.chute}>{data.chute}</td>
                    <td class={styles.order}>{data.order}</td>
                </tr>
            }</For>
            </tbody>
        </table>
    );
};
