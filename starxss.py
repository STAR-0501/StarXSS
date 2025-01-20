import os
import shutil
import requests

from lxml import etree
from flask import Flask,render_template,request,jsonify

app=Flask(__name__)


@app.route('/addDevices/',methods=["POST"])
def addDevice():
    data=request.get_json()
    url=data["url"]
    try:
        print("添加网站"+url)
        os.mkdir("devices/"+url)
        return jsonify({"status":"success"}),200
    except FileExistsError:
        print(url+"已存在")
        return jsonify({"status":"failed"}),200

@app.route('/deleteDevices/',methods=["POST"])
def deleteDevice():
    datas=request.get_json()
    for data in datas:
        url=data["url"]
        print("删除网站"+url)
        shutil.rmtree("devices/"+url)
    return jsonify({"status":"success"}),200


@app.route('/getDevices/',methods=["POST"])
def getDevices():
    ds=[]
    path='devices/'
    for root,devices,users in os.walk(path):
        for device in devices:
            try:
                content=requests.get("https://"+device)
                tree=etree.HTML(content.content)
                title=tree.xpath('/html/head/title/text()')[0][0:10]
                # print(title)
            except requests.exceptions.ConnectionError:
                title=device
                # requests.exceptions.ConnectionError
                # urllib3.exceptions.MaxRetryError
                # urllib3.exceptions.NewConnectionError
                # socket.gaierror
            d={
                "title":title,
                "url":device
            }
            ds.append(d)
    return ds


@app.route('/')
def main():
    return render_template("starxss.html")


if __name__=='__main__':
    print("欢迎使用STAR XSS ")
    app.run(host="0.0.0.0",port=616)
