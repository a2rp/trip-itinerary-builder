import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <section className={styles.intro} id="itinerary">
                <p>THE WEEK AHEAD · KYOTO, JAPAN</p>
                <h1>Make room for <span>the good days.</span></h1>
                <div><span>12 - 18 May 2027</span><i /> <span>7 days</span><i /> <span>2 travelers</span></div>
            </section>
            <section className={styles.plannerShell} id="days" aria-label="Trip planner">
                <div className={styles.placeholderRail}><span>01</span><span>Choose a day to see the plan</span></div>
                <div className={styles.placeholderSchedule}><div /><div /><div /><span>Your itinerary will take shape here.</span></div>
                <aside className={styles.placeholderSummary} id="trip-notes"><span>TRIP SNAPSHOT</span><strong>Kyoto, Japan</strong><p>A first look at your days, places, and little pauses.</p></aside>
            </section>
        </main>
        <SiteFooter />
    </div>
);

export default App;
