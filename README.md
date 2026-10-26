# Employee App Backend Integration

A full-stack Employee Management web application featuring a pre-built frontend integrated with a Node.js, Express, and MongoDB Atlas backend.

---

## Requirements Implemented

1. **GET API**:
   - `GET /api/employeelist`: Retrieves all employee records from MongoDB.
   - `GET /api/employeelist/:id`: Retrieves a single employee record by ID.

2. **POST API**:
   - `POST /api/employeelist`: Adds a new employee document (`name`, `location`, `position`, `salary`) to MongoDB.

3. **PUT API**:
   - `PUT /api/employeelist`: Updates employee information by `_id`.
   - `PUT /api/employeelist/:id`: Also supports updating directly by URL parameter.

4. **DELETE API**:
   - `DELETE /api/employeelist/:id`: Deletes a single employee from MongoDB by ID.

5. **Static Frontend Hosting**:
   - Serves the untouched frontend build from `dist/Frontend` on `http://localhost:3000`.

6. **Database Connection**:
   - Configured with Mongoose connecting to MongoDB Atlas via environment variables (`MONGODB_URI`).

---

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create or edit `.env` in the root folder with your MongoDB Atlas connection string:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

3. **Run the Server:**
   ```bash
   # Development mode with auto-reload:
   npm run dev

   # Or standard start:
   npm start
   ```

4. **Access the Application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
