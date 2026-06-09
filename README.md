# IResCoMath Research Lab Management

A research lab management system built for the IResCoMath Lab at TekUp University.

## Features
- Member authentication and administration
- Publication tracking and management
- Custom XML parser to sync publication data automatically from DBLP.org into MongoDB
- RESTful API serving authentication, publications, and member management modules

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js *(partially implemented)*
- **Data Sync:** Custom DBLP XML parser

## Note
This repository contains the backend and API. The React frontend is under development and will be added in a future update.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB

### Setup
1. Clone the repo
```bash
   git clone https://github.com/Dhiachairet/Irescomath-Research-Lab-Management.git
```
2. Install dependencies
```bash
   npm install
```
3. Create a `.env` file:
```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret
   PORT=5000
```
4. Start the server
```bash
   npm run dev
```
