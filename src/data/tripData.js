export const initialTrip = {
    title: "A week in Kyoto",
    destination: "Kyoto, Japan",
    dateRange: "12 - 18 May 2027",
    travelers: 2,
    days: [
        { id: "day-1", weekday: "Wed", date: "12 May", stops: [
            { id: "kyoto-1-1", time: "09:00", title: "Leave bags at the hotel", place: "Nohga Hotel Kiyomizu", category: "Stay", duration: "30 min", note: "Ask the front desk about early room access." },
            { id: "kyoto-1-2", time: "10:30", title: "Coffee and a slow start", place: "Weekenders Coffee", category: "Food", duration: "45 min", note: "Try the seasonal pour-over, then take the long way back." },
            { id: "kyoto-1-3", time: "12:00", title: "Wander the Higashiyama lanes", place: "Ninenzaka and Sannenzaka", category: "Walk", duration: "90 min", note: "Leave time for the small shops tucked off the main street." },
        ] },
        { id: "day-2", weekday: "Thu", date: "13 May", stops: [
            { id: "kyoto-2-1", time: "07:30", title: "Walk through the torii gates", place: "Fushimi Inari Taisha", category: "Sightseeing", duration: "2 hr", note: "Start early and follow the quieter trail above the main loop." },
            { id: "kyoto-2-2", time: "11:45", title: "Lunch at the market", place: "Nishiki Market", category: "Food", duration: "1 hr", note: "Share a few small plates and keep the afternoon open." },
            { id: "kyoto-2-3", time: "14:15", title: "Find the view from the terrace", place: "Kiyomizu-dera", category: "Sightseeing", duration: "90 min", note: "The wooden veranda looks across the eastern hills." },
        ] },
        { id: "day-3", weekday: "Fri", date: "14 May", stops: [
            { id: "kyoto-3-1", time: "08:30", title: "A quiet hour in the garden", place: "Ryoan-ji", category: "Sightseeing", duration: "1 hr", note: "The rock garden is at its calmest just after opening." },
            { id: "kyoto-3-2", time: "11:00", title: "Take the river path north", place: "Kamo River", category: "Walk", duration: "75 min", note: "Pick up a snack before you leave the center." },
        ] },
        { id: "day-4", weekday: "Sat", date: "15 May", stops: [
            { id: "kyoto-4-1", time: "09:00", title: "Browse the craft studios", place: "Okazaki district", category: "Culture", duration: "2 hr", note: "Look for small ceramics workshops around the canal." },
            { id: "kyoto-4-2", time: "13:00", title: "Lunch near the museum", place: "Sakyo ward", category: "Food", duration: "1 hr", note: "Keep this flexible; there are good counters nearby." },
        ] },
        { id: "day-5", weekday: "Sun", date: "16 May", stops: [
            { id: "kyoto-5-1", time: "08:15", title: "Bamboo grove before the day begins", place: "Arashiyama", category: "Walk", duration: "90 min", note: "Arrive before the tour buses and stay on the marked path." },
            { id: "kyoto-5-2", time: "10:30", title: "Cross the river bridge", place: "Togetsukyo Bridge", category: "Sightseeing", duration: "45 min", note: "Follow the south bank for a quieter view of the hills." },
        ] },
        { id: "day-6", weekday: "Mon", date: "17 May", stops: [
            { id: "kyoto-6-1", time: "10:00", title: "A morning in the old capital", place: "Nijo Castle", category: "Culture", duration: "2 hr", note: "Listen for the nightingale floors as you walk through." },
            { id: "kyoto-6-2", time: "14:00", title: "Tea and a little pause", place: "Gion", category: "Food", duration: "1 hr", note: "A good afternoon to leave without a reservation." },
        ] },
        { id: "day-7", weekday: "Tue", date: "18 May", stops: [
            { id: "kyoto-7-1", time: "08:30", title: "One last breakfast", place: "Demachiyanagi", category: "Food", duration: "1 hr", note: "Pick up something for the train before heading back." },
            { id: "kyoto-7-2", time: "11:00", title: "Collect bags and head to the station", place: "Kyoto Station", category: "Transit", duration: "45 min", note: "Leave a little buffer for the taxi and station hall." },
        ] },
    ],
};

export const sortStops = (stops) => [...stops].sort((first, second) => first.time.localeCompare(second.time));
