# 🖥️ shareadesk

**shareadesk** is a web app developed as part of my semester assignment in web development. It simulates a modern desk-sharing platform that allows users to search, book, and manage shared desks in a collaborative workspace. The application includes interactive features such as map-based desk visualization, calendar integration, and currency conversion to enhance usability for international users.

🌐 **Live Demo**: [shareadesk](https://zhouw9n.github.io/shareadesk.com/)

> ⚠️ **Note**: The backend server is hosted on Render’s free tier and may take **30–60 seconds to spin up** if inactive.
Thank you for your patience!

---

> ## ✨ Features

- Search & Filter desks based on availability, location, and other criteria
- Book and Delete desk reservations
- Interactive map view to visualize desk locations
- Calendar (.ics) file export for importing bookings into calendar apps
- Currency exchange integration
- Dynamic filtering and content updates without external libraries
- Custom client-side routing built with vanilla JavaScript
- Saves favorite desks in `localStorage`
- User input validation
- Fully built from scratch using JavaScript, with extensive DOM manipulation.

---

> ## 🛠️ Tech Stack

This project focused especially on learning the fundamentals of HTML, CSS, and vanilla JavaScript. No libraries or frameworks were used.

### Frontend

- JavaScript / HTML / CSS

### Backend

The backend consists of a lightweight server that handles API requests from the client, including:
- Retrieving all desks (GET)
- Retrieving all bookings (GET)
- Creating a new booking (POST)
- Deleting an existing booking (DELETE)
Data is stored in a JSON file that simulates a database containing all desk information. Additionally, the backend manages currency exchange rate requests and securely stores the API key on the server side.

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- Hosted on: [Render](https://render.com/)

### APIs Used

- [Exchangeratesapi](https://exchangeratesapi.io/documentation/) - for currency exchange
- [Leaflet](https://leafletjs.com/reference.html) - map integration
- [Calndr.Link API](https://addcal.co/api-docs) - for .ics file generation

---

> ## 📁 Project Structure

![Capture](https://github.com/user-attachments/assets/4f6af3e9-68a0-4117-889d-6b215f425ad6)

---

> ## 📸 Screenshots

### Desktop
![Capture](https://github.com/user-attachments/assets/2d899276-47fe-4b93-9a33-cd9aa36f1579)

![Capture1](https://github.com/user-attachments/assets/1f2fada6-ef08-4f4a-b185-40503c07ab3e)

![Capture2](https://github.com/user-attachments/assets/5a107dfe-9f75-49c0-bcfd-a11bce296022)

![Capture3](https://github.com/user-attachments/assets/bcc6137e-7e81-4f1c-990a-4ce5f0db25fd)

![Capture4](https://github.com/user-attachments/assets/6731298c-3f1f-4228-9fb1-97f71e2c347c)

![Capture5](https://github.com/user-attachments/assets/9144693d-3051-47b5-941e-18995e6e767e)

### Mobile
![Capture](https://github.com/user-attachments/assets/8776ad73-f71f-4c2a-9cd9-330accbd6369)

![Capture1](https://github.com/user-attachments/assets/5b73ea3f-d7f4-4cdf-8576-054ccf5b7794)

![Capture2](https://github.com/user-attachments/assets/2f54443b-d5eb-4929-9a38-f50249b9bd51)

![Capture3](https://github.com/user-attachments/assets/c478a022-0d5d-46bc-b030-ba47acd3c205)

![Capture4](https://github.com/user-attachments/assets/9abc1a9f-a04d-4958-8bb9-27d231642615)

![Capture5](https://github.com/user-attachments/assets/906682d8-6edc-47f7-8070-4a23cc540476)
