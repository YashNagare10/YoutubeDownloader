from flask import Flask, render_template, jsonify, request
from pytube import YouTube
import datetime
import os

home = os.path.expanduser("~")
downloadPath = os.path.join(home,"Downloads")

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/verify", methods=['GET','POST'])
def verify():
    if request.method == 'POST':
        data = request.get_json()
        link = data['link'].strip()
        link = link.replace(" ","")
        try:
            YouTube(link).streams
            return jsonify("200")
        except Exception as e:
            return jsonify("500")

@app.route("/getData", methods=['GET','POST'])
def getData():
    if request.method == "POST":
        try:
            data = request.get_json()
            link = data['link'].strip()
            link = link.replace(" ","")
            thumbnail = YouTube(link).thumbnail_url
            title = YouTube(link).title
            length = YouTube(link).length
            length = str(datetime.timedelta(seconds = length))
            sendData = {
                "thumbnail": thumbnail,
                "title": title,
                "length": length
            }
            return jsonify(sendData)
        except Exception as e:
            return jsonify("500")

@app.route("/download/video720", methods=['GET','POST'])
def downloadVideo720():
    if request.method == "POST":
        try:
            data = request.get_json()
            link = data['link'].strip()
            link = link.replace(" ","")
            YouTube(link).streams.filter(mime_type="video/mp4", res="720p", progressive=True, type="video").first().download(output_path=downloadPath)
            return jsonify("200")
        except Exception as e:
            return jsonify("500")

@app.route("/download/video360", methods=['GET','POST'])
def downloadVideo360():
    if request.method == "POST":
        try:
            data = request.get_json()
            link = data['link'].strip()
            link = link.replace(" ","")
            YouTube(link).streams.filter(mime_type="video/mp4", res="360p", progressive=True, type="video").first().download(output_path=downloadPath)
            return jsonify("200")
        except Exception as e:
            return jsonify("500")

@app.route("/download/audio48", methods=['GET','POST'])
def downloadAudio48():
    if request.method == "POST":
        try:
            data = request.get_json()
            link = data['link'].strip()
            link = link.replace(" ","")
            YouTube(link).streams.filter(mime_type="audio/mp4", abr="48kbps", type="audio").first().download(output_path=downloadPath)
            return jsonify("200")
        except Exception as e:
            return jsonify("500")

@app.route("/download/audio128", methods=['GET','POST'])
def downloadAudio128():
    if request.method == "POST":
        try:
            data = request.get_json()
            link = data['link'].strip()
            link = link.replace(" ","")
            YouTube(link).streams.filter(mime_type="audio/mp4", abr="128kbps", type="audio").first().download(output_path=downloadPath)
            return jsonify("200")
        except Exception as e:
            return jsonify("500")
app.run()