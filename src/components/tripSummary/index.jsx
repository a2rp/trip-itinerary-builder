import { FaArrowRight, FaCalendarDays, FaUsers } from "react-icons/fa6";
import styles from "./styles.module.css";

const TripSummary = ({ trip, day, totalStops, onExport }) => (
    <aside className={styles.tripSummary} id="trip-notes" aria-label="Trip summary">
        <section className={styles.tripCard}>
            <p className={styles.cardLabel}>TRIP AT A GLANCE</p>
            <h2>{trip.destination}</h2>
            <p className={styles.tripTitle}>{trip.title}</p>
            <div className={styles.tripDate}><FaCalendarDays aria-hidden="true" /> {trip.dateRange}</div>
            <div className={styles.tripTravelers}><FaUsers aria-hidden="true" /> {trip.travelers} travelers</div>
            <div className={styles.summaryDivider} />
            <div className={styles.tripStats}><div><strong>{trip.days.length}</strong><span>days</span></div><i /><div><strong>{totalStops}</strong><span>stops</span></div></div>
        </section>

        <section className={styles.dayShape} aria-live="polite">
            <div className={styles.sectionHead}><p className={styles.cardLabel}>TODAY'S SHAPE</p><span>{day.weekday}, {day.date}</span></div>
            {day.stops.length ? <ol>{day.stops.slice(0, 4).map((stop, index) => <li key={stop.id}><span className={styles.shapeNumber}>{String(index + 1).padStart(2, "0")}</span><span className={styles.shapeText}><strong>{stop.time}</strong><span>{stop.place}</span></span>{index < Math.min(day.stops.length, 4) - 1 && <FaArrowRight className={styles.shapeArrow} aria-hidden="true" />}</li>)}</ol> : <p className={styles.noStops}>A blank page. Add your first stop for this day.</p>}
        </section>

        <section className={styles.travelNote}><span className={styles.noteMark}>“</span><p>Leave a little space between the places you planned and the places you find.</p><span>NOTE TO SELF</span></section>
        <button className={styles.exportButton} type="button" onClick={onExport}>Export itinerary</button>
    </aside>
);

export default TripSummary;
