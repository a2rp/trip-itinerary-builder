import { FaGithub, FaRoute } from "react-icons/fa";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.siteHeader}>
        <a className={styles.brand} href="#top" aria-label="Routebook home"><span className={styles.brandIcon}><FaRoute aria-hidden="true" /></span><span>routebook</span></a>
        <nav className={styles.navigation} aria-label="Main navigation"><a href="#days">Your days</a><a href="#trip-notes">Trip notes</a></nav>
        <a className={styles.repositoryLink} href="https://github.com/a2rp/trip-itinerary-builder" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /><span>Repository</span></a>
    </header>
);

export default SiteHeader;
