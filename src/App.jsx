import { useState } from "react";
import DaySelector from "./components/daySelector/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { initialTrip } from "./data/tripData.js";
import styles from "./App.module.css";

const App = () => {
    const [selectedDayId, setSelectedDayId] = useState(initialTrip.days[0].id);
    const selectedDay = initialTrip.days.find((day) => day.id === selectedDayId) ?? initialTrip.days[0];

    return <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <section className={styles.intro} id="itinerary">
                <p>THE WEEK AHEAD · {initialTrip.destination.toUpperCase()}</p>
                <h1>Make room for <span>the good days.</span></h1>
                <div><span>{initialTrip.dateRange}</span><i /> <span>{initialTrip.days.length} days</span><i /> <span>{initialTrip.travelers} travelers</span></div>
            </section>
            <section className={styles.plannerShell} id="days" aria-label="Trip planner">
                <DaySelector days={initialTrip.days} selectedDayId={selectedDayId} onSelect={setSelectedDayId} />
                <section className={styles.placeholderSchedule} id="day-plan-panel" role="tabpanel" aria-labelledby={`day-tab-${selectedDay.id}`}>
                    <h2>{selectedDay.weekday}, {selectedDay.date}</h2>
                    {selectedDay.stops.map((stop) => <article className={styles.previewStop} key={stop.id}><time>{stop.time}</time><div><strong>{stop.title}</strong><span>{stop.place}</span></div><span>{stop.duration}</span></article>)}
                </section>
                <aside className={styles.placeholderSummary} id="trip-notes"><span>TRIP SNAPSHOT</span><strong>{initialTrip.destination}</strong><p>{initialTrip.title} · {initialTrip.days.reduce((count, day) => count + day.stops.length, 0)} planned stops. A first look at your days, places, and little pauses.</p></aside>
            </section>
        </main>
        <SiteFooter />
    </div>;
};

export default App;
