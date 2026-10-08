import { useCallback, useEffect, useMemo, useState } from "react";
import DaySelector from "../daySelector/index.jsx";
import DailySchedule from "../dailySchedule/index.jsx";
import StopDialog from "../stopDialog/index.jsx";
import TripSummary from "../tripSummary/index.jsx";
import { initialTrip, sortStops } from "../../data/tripData.js";
import styles from "./styles.module.css";

const storageKey = "routebook-kyoto-itinerary-v1";
const blankForm = { time: "09:00", title: "", place: "", category: "Sightseeing", duration: "1 hr", note: "" };

const readTrip = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved?.days?.length && saved.days.every((day) => Array.isArray(day.stops))) return saved;
    } catch { /* Use the example itinerary if saved data cannot be read. */ }
    return initialTrip;
};

const ItineraryBoard = ({ initialTrip, onStopTotalChange }) => {
    const [trip, setTrip] = useState(readTrip);
    const [selectedDayId, setSelectedDayId] = useState(() => readTrip().days[0]?.id ?? initialTrip.days[0].id);
    const [category, setCategory] = useState("All types");
    const [dialog, setDialog] = useState(null);
    const [form, setForm] = useState(blankForm);

    useEffect(() => {
        try { localStorage.setItem(storageKey, JSON.stringify(trip)); } catch { /* The current itinerary remains available if storage is full. */ }
    }, [trip]);

    const selectedDay = trip.days.find((day) => day.id === selectedDayId) ?? trip.days[0];
    const totalStops = useMemo(() => trip.days.reduce((count, day) => count + day.stops.length, 0), [trip.days]);
    const visibleStops = useMemo(() => sortStops(selectedDay.stops.filter((stop) => category === "All types" || stop.category === category)), [category, selectedDay]);

    useEffect(() => { onStopTotalChange(totalStops); }, [onStopTotalChange, totalStops]);

    const openAdd = () => { setForm(blankForm); setDialog({ kind: "add" }); };
    const openEdit = (stop) => { setForm({ ...stop }); setDialog({ kind: "edit", stop }); };
    const openDelete = (stop) => setDialog({ kind: "delete", stop });
    const closeDialog = useCallback(() => setDialog(null), []);

    const updateDayStops = (dayId, changeStops) => setTrip((current) => ({
        ...current,
        days: current.days.map((day) => day.id === dayId ? { ...day, stops: sortStops(changeStops(day.stops)) } : day),
    }));

    const saveStop = (event) => {
        event.preventDefault();
        const stop = { ...form, title: form.title.trim(), place: form.place.trim(), note: form.note.trim(), id: dialog.kind === "edit" ? dialog.stop.id : crypto.randomUUID() };
        updateDayStops(selectedDay.id, (stops) => dialog.kind === "edit" ? stops.map((item) => item.id === stop.id ? stop : item) : [...stops, stop]);
        setCategory("All types");
        setDialog(null);
    };

    const deleteStop = () => {
        const stopId = dialog.stop.id;
        updateDayStops(selectedDay.id, (stops) => stops.filter((stop) => stop.id !== stopId));
        setDialog(null);
    };

    const exportItinerary = () => {
        const exportData = { title: trip.title, destination: trip.destination, dateRange: trip.dateRange, travelers: trip.travelers, exportedAt: new Date().toISOString(), days: trip.days.map((day) => ({ ...day, stops: sortStops(day.stops) })) };
        const file = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "routebook-kyoto-itinerary.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    return <section className={styles.itineraryBoard} aria-label="Trip itinerary">
        <DaySelector days={trip.days} selectedDayId={selectedDay.id} onSelect={(dayId) => { setSelectedDayId(dayId); setCategory("All types"); }} />
        <DailySchedule day={selectedDay} stops={visibleStops} category={category} onCategoryChange={setCategory} onAdd={openAdd} onEdit={openEdit} onDelete={openDelete} />
        <div className={styles.summarySlot}><TripSummary trip={trip} day={selectedDay} totalStops={totalStops} onExport={exportItinerary} /></div>
        {dialog && <StopDialog dialog={dialog} selectedDay={selectedDay} destination={trip.destination} form={form} setForm={setForm} onClose={closeDialog} onSave={saveStop} onDelete={deleteStop} />}
    </section>;
};

export default ItineraryBoard;
