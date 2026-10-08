import { useEffect, useRef } from "react";
import { FaTrash, FaXmark } from "react-icons/fa6";
import styles from "./styles.module.css";

const StopDialog = ({ dialog, selectedDay, destination, form, setForm, onClose, onSave, onDelete }) => {
    const dialogRef = useRef(null);
    const safeRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        (dialog.kind === "delete" ? safeRef : titleRef).current?.focus();
        const onKeyDown = (event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "Tab") {
                const focusable = [...dialogRef.current.querySelectorAll("button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)")].filter((element) => element.offsetParent !== null);
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => { window.removeEventListener("keydown", onKeyDown); previousFocus?.focus?.(); };
    }, [dialog, onClose]);

    const onOverlayMouseDown = (event) => { if (event.target === event.currentTarget) onClose(); };
    const stop = dialog.stop;

    return <div className={styles.overlay} onMouseDown={onOverlayMouseDown}>
        {dialog.kind === "delete" ? <section ref={dialogRef} className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="remove-stop-heading" aria-describedby="remove-stop-description">
            <span className={styles.deleteIcon}><FaTrash aria-hidden="true" /></span>
            <h2 id="remove-stop-heading">Remove this stop?</h2>
            <p id="remove-stop-description">“{stop.title}” will be removed from {selectedDay.weekday}, {selectedDay.date}.</p>
            <div className={styles.dialogActions}><button ref={safeRef} className={styles.cancelButton} type="button" onClick={onClose}>Keep stop</button><button className={styles.deleteButton} type="button" onClick={onDelete}>Remove stop</button></div>
        </section> : <form ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="stop-dialog-heading" onSubmit={onSave}>
            <header className={styles.dialogHeader}><div><p>{dialog.kind === "edit" ? "UPDATE YOUR DAY" : "ADD TO THE DAY"}</p><h2 id="stop-dialog-heading">{dialog.kind === "edit" ? "Edit this stop" : `Add a stop to ${selectedDay.weekday}`}</h2><span>{selectedDay.date} in {destination.split(",")[0]}</span></div><button className={styles.closeButton} type="button" aria-label="Close dialog" onClick={onClose}><FaXmark aria-hidden="true" /></button></header>
            <label className={styles.formField}>What are you doing?<input ref={titleRef} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Visit a tea house" maxLength="64" required /></label>
            <label className={styles.formField}>Where?<input value={form.place} onChange={(event) => setForm({ ...form, place: event.target.value })} placeholder="A place or neighborhood" maxLength="72" required /></label>
            <div className={styles.fieldRow}><label className={styles.formField}>Start time<input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} required /></label><label className={styles.formField}>Length<select value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })}><option>30 min</option><option>45 min</option><option>1 hr</option><option>90 min</option><option>2 hr</option><option>Half day</option></select></label></div>
            <label className={styles.formField}>Type<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option>Food</option><option>Walk</option><option>Sightseeing</option><option>Culture</option><option>Stay</option><option>Transit</option></select></label>
            <label className={styles.formField}>A note for later <span>(optional)</span><textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Opening times, a booking detail, or a thought to remember" rows="3" maxLength="180" /></label>
            <div className={styles.dialogActions}><button ref={safeRef} className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button><button className={styles.saveButton} type="submit">{dialog.kind === "edit" ? "Save changes" : "Add stop"}</button></div>
        </form>}
    </div>;
};

export default StopDialog;
