import styles from './index.module.css';
import {Icon} from "solid-heroicons";
import {plusCircle} from "solid-heroicons/solid";
import {batch, createSignal} from "solid-js";
import SupportData from "../../data/SupportData";
import {produce} from "solid-js/store";
import Store from "../../data/Store";

export default () => {
    const [newData, setData] = createSignal("");
    const [, setStore] = Store;
    const addData = (e: SubmitEvent) => {
        e.preventDefault();

        const dataList = SupportData.deserializeAll(newData());
        batch(() => {
            for (const newData of dataList) {
                setStore(
                    produce((data) => {
                        if (data.dataList.findIndex(newData.equals.bind(addData)) === -1) {
                            data.dataList.push(newData);
                        }
                    })
                );
            }
            setData("");
        });
    };
    return (
        <form class={styles.HeaderTools} onSubmit={addData}>
            <input class={styles.HeaderSearch}
                   placeholder="enter data and click +"
                   required
                   value={newData()}
                   onInput={(e) => setData(e.currentTarget.value)}
            />
            <button class={styles.HeaderButtonIcon}>
                <Icon class={styles.HeaderButtonIcon} path={plusCircle}/>
            </button>
        </form>
    );
};
