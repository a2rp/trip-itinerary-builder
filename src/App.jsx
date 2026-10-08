import { useState } from "react";
import ItineraryBoard from "./components/itineraryBoard/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { initialTrip } from "./data/tripData.js";
import styles from "./App.module.css";

const App = () => {
    const [plannedStops, setPlannedStops] = useState(() => initialTrip.days.reduce((count, day) => count + day.stops.length, 0));

    return <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <section className={styles.intro} id="itinerary">
                <div className={styles.introCopy}>
                    <p>THE WEEK AHEAD · {initialTrip.destination.toUpperCase()}</p>
                    <h1>Make room for <span>the good days.</span></h1>
                    <div><span>{initialTrip.dateRange}</span><i /> <span>{initialTrip.days.length} days</span><i /> <span>{initialTrip.travelers} travelers</span></div>
                </div>
                <div className={styles.tripStatus}><span /> {plannedStops} planned stops</div>
            </section>
            <ItineraryBoard initialTrip={initialTrip} onStopTotalChange={setPlannedStops} />
        </main>
        <SiteFooter />
    </div>;
};

export default App;
