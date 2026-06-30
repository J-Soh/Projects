from flask import Flask, request, render_template

app = Flask(__name__)

# Go to root folder (forms) > open index.html file
@app.route("/")
def index():
    return render_template("index.html")

# Inside index.index file get data from user input
@app.route("/submit123", methods=["POST"])
def abc():
    username = request.form.get("user123")
    password = request.form.get("pass123")
    gender = request.form.get("gender")
    comment = request.form.get("comment")
    fruit = request.form.get("fruits")

    return f"""
    Username: {username}<br>
    Password: {password}<br>
    Gender: {gender}<br>
    Comment: {comment}<br>
    Fruit: {fruit}
    """

# Inside index.index file get data from user input
@app.route("/get123", methods=["GET"])

def search():
    query = request.args.get("user123", "")
    return f"You searched {query}"

# python app.py
if __name__ == "__main__":
    app.run(debug=True, port=8000)