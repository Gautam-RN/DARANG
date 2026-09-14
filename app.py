from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/student")
def student():
    return render_template("student.html")

@app.route("/faculty")
def faculty():
    return render_template("faculty.html")

@app.route("/industry")
def industry():
    return render_template("industry.html")

@app.route("/institution")
def institution():
    return render_template("institution.html")

if __name__ == '__main__':
    app.run(debug=True)