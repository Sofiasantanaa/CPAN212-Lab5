## NorthStar Advisory Services – Dynamic View Generation System
## Project Overview

This project is a server-side rendered web application built using Node.js, Express, and EJS. It dynamically generates business interface pages for NorthStar Advisory Services using reusable layouts and modular components. Client data is stored in a JSON file and rendered dynamically into the views.
The application replaces static HTML pages with dynamic templates and ensures consistent layout structure across all pages.

## Installation Instructions

1. Clone the repository:

git clone <your-repository-link>

2. Navigate into the project folder:

cd project-folder

3. Install dependencies:

npm install

## Application Startup Instructions

Start the server by running:
npm start

Then open your browser at:

http://localhost:3000

## List of Implemented Routes
## Server-Side Rendered Routes

/ → Home page

/clients → Client list page

/clients/:id → Individual client details page

/clients/create → Create client form

/clients/update/:id → Update client form

## Form Submission Routes

POST /clients/create → Create new client

POST /clients/update/:id → Update client

POST /clients/delete/:id → Delete client

## API Routes

GET /api/clients → Returns all clients in JSON format

GET /api/clients/:id → Returns a single client in JSON format
