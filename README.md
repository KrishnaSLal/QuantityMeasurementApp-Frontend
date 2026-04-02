# 📏 Quantity Measurement App - Frontend

A simple and interactive frontend application for **Quantity Measurement** built using **HTML, CSS, and JavaScript**, integrated with **json-server** for mock backend functionality.

---

## 🚀 Features

### 🔐 Authentication
- Signup with name, email, and password
- Login using registered credentials
- Basic validation (empty fields, password match)
- Stores logged-in user in `localStorage`

---

### 📊 Dashboard Functionalities

#### 🧪 Measurement Types
- Length 📏  
- Weight ⚖️  
- Temperature 🌡️  
- Volume 🧪  

---

#### ⚙️ Operations Supported
- Comparison (>, <, =)  
- Unit Conversion  
- Arithmetic Operations (+, -, *, /)

---

#### 🎯 Features
- Dynamic unit selection
- Real-time calculation
- Operator selection
- Responsive UI

---

## 🛠️ Tech Stack

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  
- json-server (Mock Backend)

---

## 📁 Project Structure
```
QuantityMeasurementApp-Frontend/
├── db.json
├── html/
│ ├── auth.html
│ └── dashboard.html
├── css/
│ ├── auth.css
│ └── dashboard.css
├── js/
│ ├── auth.js
│ ├── auth-api.js
│ ├── dashboard.js
│ └── quantity-length.js

```


## 🌐 API Endpoints (json-server)

| Method | Endpoint | Description |
|--------|---------|------------|
| GET    | /users  | Get all users |
| POST   | /users  | Register new user |
| GET    | /users?email= | Find user by email |

---

## 🔄 Future Enhancements

- Spring Boot backend integration (Port 8080)
- JWT Authentication
- Store calculation history in database
- React / Angular frontend upgrade
- Improved UI/UX design

---

## 🧠 Learning Outcomes

- DOM manipulation  
- Event handling  
- REST API integration (mock)  
- Frontend-backend communication  
- Project structuring  

---


## ⭐ Notes

- `db.json` is used as a mock database  
- Do not store sensitive data in it  
- This is a development-stage project  

---

## 🎯 Branch Strategy

- `main` → stable code  
- `dev` → development branch  
- `feature/*` → feature-based work  

---

## 🙌 Acknowledgements

This project follows a structured learning path:  
**UI → Mock Backend → Real Backend → Framework Integration**

---

🔗*Code Link*

[feature/QM-HTML-CSS-JS-JSONServer](https://github.com/KrishnaSLal/QuantityMeasurementApp-Frontend/tree/feature/QM-HTML-CSS-JS-JSONServer)

---
