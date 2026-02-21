import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES module __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to clients dataset JSON
const dataPath = path.join(__dirname, "..", "data", "clients.json");

// Load clients from JSON file
const loadClients = () => {
  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

// Save clients to JSON file
const saveClients = (clients) => {
  fs.writeFileSync(dataPath, JSON.stringify(clients, null, 2), "utf-8");
};

// Find a client by ID
const findClientById = (clients, id) =>
  clients.find((c) => String(c.id) === String(id));

//SSR PAGES 
// Render Home page
export const renderHome = (req, res) => {
  res.render("pages/home", {
    pageTitle: "Home",
    message:
      "This portal demonstrates dynamic server-side rendering using EJS layouts and partials. JSON APIs are available for an AngularJS frontend.",
    now: new Date().toLocaleString(),
  });
};

// Render clients list page
export const renderClientsList = (req, res) => {
  const clients = loadClients();
  res.render("pages/clients", {
    pageTitle: "Clients",
    clients,
    totalClients: clients.length,
    now: new Date().toLocaleString(),
  });
};

// Render individual client details page
export const renderClientDetails = (req, res) => {
  const clients = loadClients();
  const client = findClientById(clients, req.params.id);
  if (!client) {
    return res.status(404).render("pages/notFound", {
      pageTitle: "Client Not Found",
      details: `No client record found for id: ${req.params.id}`,
    });
  }
  res.render("pages/clientDetails", {
    pageTitle: "Client Profile",
    clientt: client,
    now: new Date().toLocaleString(),
  });
};

// Render page to create a new client
export const renderCreateClient = (req, res) => {
  res.render("pages/clientForm", {
    pageTitle: "Create Client",
    action: "/clients/create",
    method: "POST",
    client: {}, // empty object for new client
  });
};

// Render page to update an existing client
export const renderUpdateClient = (req, res) => {
  const clients = loadClients();
  const client = findClientById(clients, req.params.id);
  if (!client) {
    return res.status(404).render("pages/notFound", {
      pageTitle: "Client Not Found",
    });
  }
  res.render("pages/clientForm", {
    pageTitle: "Update Client",
    action: `/clients/update/${client.id}`,
    method: "POST",
    client,
  });
};

//SSR FORM ACTIONS 

// Create a new client and save to JSON
export const createClient = (req, res) => {
  const clients = loadClients();
  const newId = Math.max(...clients.map((c) => c.id)) + 1; // generate new ID
  const newClient = { id: newId, ...req.body };
  clients.push(newClient);
  saveClients(clients);
  res.redirect("/clients"); // redirect to clients list
};

// Update existing client
export const updateClient = (req, res) => {
  const clients = loadClients();
  const index = clients.findIndex((c) => String(c.id) === req.params.id);
  if (index === -1) return res.status(404).render("pages/notFound");
  clients[index] = { ...clients[index], ...req.body }; // merge updated fields
  saveClients(clients);
  res.redirect(`/clients/${req.params.id}`);
};

// Delete client by ID
export const deleteClient = (req, res) => {
  let clients = loadClients();
  clients = clients.filter((c) => String(c.id) !== req.params.id);
  saveClients(clients);
  res.redirect("/clients");
};

// API ROUTES 

// API: get all clients
export const apiGetClients = (req, res) => {
  const clients = loadClients();
  res.json({ total: clients.length, clients });
};

// API: get client by ID
export const apiGetClientById = (req, res) => {
  const clients = loadClients();
  const client = findClientById(clients, req.params.id);
  if (!client) return res.status(404).json({ error: "Client Not Found" });
  res.json({ client });
};

