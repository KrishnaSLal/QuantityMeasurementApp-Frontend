const BASE_URL = "http://localhost:3000";

// SIGNUP
async function signupUser(data) {
    try {
        // check if email already exists
        const checkRes = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(data.email)}`);
        const existingUsers = await checkRes.json();

        if (existingUsers.length > 0) {
            alert("User already exists with this email");
            return null;
        }

        const res = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Unable to signup");
        }

        const result = await res.json();
        alert("Signup successful. Please login!");
        return result;
    } catch (err) {
        alert("Signup failed: " + err.message);
        return null;
    }
}

// LOGIN
async function loginUser(data) {
    try {
        const res = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(data.email)}`);
        if (!res.ok) {
            throw new Error("Unable to login");
        }

        const users = await res.json();

        if (users.length === 0) {
            alert("User not found");
            return null;
        }

        const user = users[0];

        if (user.password !== data.password) {
            alert("Invalid password");
            return null;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful");
        window.location.href = "dashboard.html";
        return user;
    } catch (err) {
        alert("Login failed: " + err.message);
        return null;
    }
}