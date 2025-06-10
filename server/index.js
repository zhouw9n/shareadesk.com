import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { error } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const desksFile = path.join(__dirname, "data/desks.json");
const bookingFile = path.join(__dirname, "data/bookings.json");

const readData = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Get all Desks
app.get("/desks", (req, res) => {
    try {
        const desks = readData(desksFile);
        res.json(desks);
    } catch (error) {
        res.status(500).json({ error: "Failed to load desks."});
    }
});

// Get Bookings
app.get("/bookings", (req, res) => {
    const { deskid, start, end } = req.query;

    if (!deskid || !start || !end) {
        return res.status(400).json({ error: "Missing required query parameters."});
    }

    try {
        const bookings = readData(bookingFile);

        const matchingBookings = bookings.filter(booking => 
            booking.deskid === deskid &&
            booking.start > start &&
            booking.end < end 
        );

        res.json(matchingBookings);
    } catch (error) {
        res.status(500).json({ error: "Failed to load bookings"})
    } 
});

// Make Booking
app.post("/booking", (req, res) => {
    const { deskid, user, email, start, end} = req.body;

    if (!deskid || !user || !email || !start || !end) {
        return res.status(400).json({ error: "Missing required query parameters."});
    }

    try {
        const bookings = readData(bookingFile);

        const conflict = bookings.some(booking => 
            booking.deskid === deskid &&
            (
                (start < booking.end && end > booking.start)
            )
        );

        if (conflict) {
            return res.status(409).json( {
                success: false,
                errorcode: "150",
                message: "Period already occupied"
            });
        }

        const newBooking = {
            id: (bookings.length > 0 ? (parseInt(bookings[bookings.length - 1].id) + 1) : 1).toString(),
            deskid,
            start,
            end,
            user,
            email
        }

        bookings.push(newBooking);
        writeData(bookingFile, bookings);

        return res.status(201).json({
            success: true,
            message: "Booking successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            errorcode: "500",
            message: "Internal server error"
        });
    }
});

// Delete Booking
app.delete("/booking/:id", (req, res) => {
    const bookingId = req.params.id;

    if (!bookingId) {
        return res.status(400).json( {success: false, message: "Booking ID is required"});
    }

    try {
        const bookings = readData(bookingFile);
        const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);

        if (bookingIndex === -1) {
            return res.status(404).json( {success: false, message: "Booking not found"});
        }

        bookings.splice(bookingIndex, 1);
        writeData(bookingFile, bookings);
        return res.status(200).json({ success: true, message: "Booking deleted successfully"});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
});


/**
 * API: Exchange rate
 * (https://exchangeratesapi.io/)
 * 
 */
app.get("/exchangerate/:amount/:from/:to", async (req, res) => {
    const amount = req.params.amount;
    const from = req.params.from;
    const to = req.params.to;

    if (!amount) {
        return res.status(400).json({ success: false, message: "Value to be converted is required"});
    }

    if (!from) {
        return res.status(400).json({ success: false, message: "Currency to convert from is required"})
    }

    if (!to) {
        return res.status(400).json({ success: false, message: "Currency to be converted in is required"})
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/pair/${from}/${to}/${amount}`);
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody?.error?.message || `HTTP error: ${response.status}`;
            return res.status(response.status).json({ success: false, error: errorMessage});
        }

        const data = await response.json();
        return res.json({ success: true, data});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Fetching exchange rate failed"});
    }
});

app.listen(PORT);