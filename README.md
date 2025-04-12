# DigitalKraj

**DigitalKraj** is a modern digital portal designed to provide a unified and efficient tool for informing residents, simplifying administrative processes between citizens and local government, and serving as a digital guide to the region.

## Introduction

DigitalKraj aims to digitize local government services and provide easy access to essential regional information. The project includes features such as local event updates, information on public services, a booking system for official visits, and a payment portal for taxes and services. This system also enables citizen participation through voting and feedback collection.

Key features:
- Current news and updates for citizens.
- Services for residents (government offices, schools, healthcare centers, etc.).
- Overview of cultural, sports, and community events, including volunteer activities.
- Booking system for visiting government offices.
- Electronic payment services (e.g., waste fees, taxes).
- Voting system and feedback collection.
- Citizen registration with personal preferences and notifications.
- Notifications for various events.
- Interactive map for displaying events and points of interest.

## Project Structure

The project is divided into two main parts:

### 1. Backend (Python - FastAPI)

The backend provides API endpoints for handling:
- **Bot Functionality**: A chatbot for regional inquiries using **Gemini AI**.
- **PDF Generation**: Generates receipts for payments made by users.
- **Local Knowledge**: Provides knowledge about local services, events, and geographical points of interest.

Key files:
- `main.py`: Starts the FastAPI server and includes routes for serving templates and handling API requests.
- `ai.py`: Handles interactions with **Gemini AI** for generating chat responses.
- `map.py`: Manages the route that serves the interactive map template.
- `profile.py`: Manages user profiles and associated features.

To run the server, navigate to the backend folder and execute:
```bash
python main.py
```
### 2. Frontend (React - Vite)

The frontend is a React-based web application built using Vite for development and Leaflet for interactive map display.

#### Key files:
- `Home.jsx`: Displays the homepage, including a banner, news feed, and service section.
- `Tourism.jsx`: Displays information about local tourism, events, and a map for better navigation.

To run the frontend, navigate to the frontend folder and execute:

```bash
npm run dev
