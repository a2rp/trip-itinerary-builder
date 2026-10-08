import styles from "./styles.module.css";

const DaySelector = ({ days, selectedDayId, onSelect }) => {
    const selectDayByKeyboard = (event, index) => {
        let nextIndex;
        if (event.key === "ArrowDown") nextIndex = Math.min(index + 1, days.length - 1);
        else if (event.key === "ArrowUp") nextIndex = Math.max(index - 1, 0);
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = days.length - 1;
        else return;
        event.preventDefault();
        onSelect(days[nextIndex].id);
        document.getElementById(`day-tab-${days[nextIndex].id}`)?.focus();
    };

    return (
        <div className={styles.daySelector} role="tablist" aria-label="Choose an itinerary day" aria-orientation="vertical">
            {days.map((day, index) => <button className={styles.dayTab} id={`day-tab-${day.id}`} key={day.id} type="button" role="tab" aria-selected={day.id === selectedDayId} aria-controls="day-plan-panel" tabIndex={day.id === selectedDayId ? 0 : -1} onClick={() => onSelect(day.id)} onKeyDown={(event) => selectDayByKeyboard(event, index)}>
                <span className={styles.dayNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.dayDate}><strong>{day.weekday}</strong><span>{day.date}</span></span>
                <span className={styles.stopCount}>{day.stops.length}</span>
            </button>)}
        </div>
    );
};

export default DaySelector;
