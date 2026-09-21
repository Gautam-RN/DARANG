from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from auth import register_user, login_user

app = Flask(__name__)

# IMPORTANT:
# Change this to a long random secret in production.
app.secret_key = "edusathi-secret-key-change-this"


# =========================
# HOME
# =========================

@app.route("/")
def home():
    return render_template("home.html")


# =========================
# REGISTER PAGE
# =========================

@app.route("/register", methods=["GET"])
def register():
    return render_template("register.html")


# =========================
# REGISTER USER
# =========================

@app.route("/auth", methods=["POST"])
def auth():

    full_name = request.form.get("full_name", "").strip()
    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")
    confirm_password = request.form.get("confirmPassword", "")
    role = request.form.get("role", "").strip().upper()

    # -------------------------
    # Required fields
    # -------------------------

    if not full_name or not email or not password or not role:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    # -------------------------
    # Valid role
    # -------------------------

    allowed_roles = ["ST", "FC", "IN", "ID"]

    if role not in allowed_roles:
        return jsonify({
            "success": False,
            "message": "Invalid role selected."
        }), 400

    # -------------------------
    # Password confirmation
    # -------------------------

    if password != confirm_password:
        return jsonify({
            "success": False,
            "message": "Passwords do not match."
        }), 400

    # -------------------------
    # Password length
    # -------------------------

    if len(password) < 8:
        return jsonify({
            "success": False,
            "message": "Password must contain at least 8 characters."
        }), 400

    # -------------------------
    # Create user
    # -------------------------

    success, result = register_user(
        full_name,
        email,
        password,
        role
    )

    if not success:
        status_code = 409 if "already exists" in str(result).lower() else 500

        return jsonify({
            "success": False,
            "message": str(result)
        }), status_code

    # result = uid
    return jsonify({
        "success": True,
        "message": "Account created successfully.",
        "uid": result,
        "role": role
    }), 201


# =========================
# LOGIN PAGE
# =========================

@app.route("/login", methods=["GET"])
def login():
    return render_template("login.html")


# =========================
# LOGIN USER
# =========================

@app.route("/login", methods=["POST"])
def login_post():

    email = request.form.get("email", "").strip().lower()
    password = request.form.get("password", "")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    success, result = login_user(email, password)

    if not success:
        return jsonify({
            "success": False,
            "message": result
        }), 401

    # Store user information in session
    session["uid"] = result["uid"]
    session["full_name"] = result["full_name"]
    session["email"] = result["email"]
    session["role"] = result["role"]

    # Redirect according to role

    role_redirects = {
        "ST": "/student",
        "FC": "/faculty",
        "IN": "/institution",
        "ID": "/industry"
    }

    redirect_url = role_redirects.get(result["role"], "/")

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "redirect": redirect_url
    })


# =========================
# LOGOUT
# =========================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("home"))


# =========================
# STUDENT
# =========================

@app.route("/student")
def student():

    if "uid" not in session:
        return redirect(url_for("login"))

    if session.get("role") != "ST":
        return redirect(url_for("home"))

    return render_template("student.html")


# =========================
# FACULTY
# =========================

@app.route("/faculty")
def faculty():

    if "uid" not in session:
        return redirect(url_for("login"))

    if session.get("role") != "FC":
        return redirect(url_for("home"))

    return render_template("faculty.html")


# =========================
# INDUSTRY
# =========================

@app.route("/industry")
def industry():

    if "uid" not in session:
        return redirect(url_for("login"))

    if session.get("role") != "ID":
        return redirect(url_for("home"))

    return render_template("industry.html")


# =========================
# INSTITUTION
# =========================

@app.route("/institution")
def institution():

    if "uid" not in session:
        return redirect(url_for("login"))

    if session.get("role") != "IN":
        return redirect(url_for("home"))

    return render_template("institution.html")


# =========================
# DATABASE TEST
# =========================

@app.route("/db")
def db_test():

    from database import connect

    db = connect()

    if db:
        db.close()

        return jsonify({
            "success": True,
            "message": "Database connection successful."
        })

    return jsonify({
        "success": False,
        "message": "Database connection failed."
    }), 500


# =========================
# RUN
# =========================

if __name__ == "__main__":
    app.run(debug=True)