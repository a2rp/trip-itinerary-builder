import { FaClock, FaLocationDot, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import styles from "./styles.module.css";

const DailySchedule = ({ day, stops, category, onCategoryChange, onAdd, onEdit, onDelete }) => (
    <section className={styles.dailySchedule} id="day-plan-panel" role="tabpanel" aria-labelledby={`day-tab-${day.id}`}>
        <div className={styles.scheduleHeader}>
            <div><p>{day.weekday.toUpperCase()} · {day.date.toUpperCase()}</p><h2>Plan the in-between.</h2><span>A little structure, with room to wander.</span></div>
            <button className={styles.addStopButton} type="button" onClick={onAdd}><FaPlus aria-hidden="true" /> Add a stop</button>
        </div>

        <div className={styles.scheduleTools}>
            <div><FaClock aria-hidden="true" /><span>{stops.length} {stops.length === 1 ? "stop" : "stops"} today</span></div>
            <label>Show <select value={category} onChange={(event) => onCategoryChange(event.target.value)} aria-label="Filter stops by type"><option>All types</option><option>Food</option><option>Walk</option><option>Sightseeing</option><option>Culture</option><option>Stay</option><option>Transit</option></select></label>
        </div>

        {stops.length ? <ol className={styles.timeline}>
            {stops.map((stop) => <li className={styles.timelineStop} key={stop.id}>
                <div className={styles.timeColumn}><time>{stop.time}</time><span className={styles.timelineDot} /></div>
                <article className={styles.stopCard}>
                    <div className={styles.stopMeta}><span className={styles.categoryPill} data-category={stop.category}>{stop.category}</span><span>{stop.duration}</span></div>
                    <h3>{stop.title}</h3>
                    <p className={styles.stopPlace}><FaLocationDot aria-hidden="true" /> {stop.place}</p>
                    {stop.note && <p className={styles.stopNote}>{stop.note}</p>}
                    <div className={styles.stopActions}><button type="button" onClick={() => onEdit(stop)} aria-label={`Edit ${stop.title}`}><FaPen aria-hidden="true" /> Edit</button><button type="button" onClick={() => onDelete(stop)} aria-label={`Remove ${stop.title}`}><FaTrash aria-hidden="true" /> Remove</button></div>
                </article>
            </li>)}
        </ol> : <div className={styles.emptySchedule}><span>No stops in this view.</span><p>{category === "All types" ? "Add the first place for this day." : "Try another stop type or show all types."}</p><button type="button" onClick={category === "All types" ? onAdd : () => onCategoryChange("All types")}>{category === "All types" ? "Add a stop" : "Show all types"}</button></div>}
    </section>
);

export default DailySchedule;
