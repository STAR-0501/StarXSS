import os
import shutil
import requests
import art
import time
import logging


from lxml import etree
from flask import Flask,render_template,request,jsonify


def outlog(log,types):
    if types=='error':
        print("\033[1;31m")  #红色
    if types=='tips':
        print("\033[1;36m")  #青色
    print(time.strftime("%Y-%m-%d %H:%M:%S  "),log)


app=Flask("STAR XSS")
log=logging.getLogger('werkzeug')
log.disabled=True


@app.route('/addDevices/',methods=["POST"])
def addDevice():
    data=request.get_json()
    url=data["url"]
    try:
        outlog("添加网站"+url,'tips')
        os.mkdir("devices/"+url)
        return jsonify({"status":"success"}),200
    except FileExistsError:
        outlog("添加失败!"+url+"已存在",'error')
        return jsonify({"status":"failed"}),200


@app.route('/deleteDevices/',methods=["POST"])
def deleteDevice():
    datas=request.get_json()
    for data in datas:
        url=data["url"]
        outlog("删除网站"+url,'tips')
        try:
            shutil.rmtree("devices/"+url)
        except:
            outlog(url+"删除失败",'error')
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
            except requests.exceptions.ConnectionError:
                title=device
            d={
                "title":title,
                "url":device
            }
            ds.append(d)
    outlog('网站列表已刷新','tips')
    return ds


@app.route('/')
def main():
    return render_template("starxss.html")


if __name__=='__main__':
    print("\033[1;36m")  #青色
    art.tprint("STAR XSS",font='tarty1')  #LOGO
    print("\033[1;35m")  #紫色
    print("感谢使用STAR XSS             RIYI")
    print("                           STAR™")
    print("\033[1;31m")  #红色
    print("免责声明")
    print("本软件仅供教育和研究用途，禁止用于非法用途")
    print("使用本软件所产生的一切后果，由使用者自行承担。")
    print("访问http://127.0.0.1:616使用本工具")
    print("\033[1;34m")  #蓝色
    app.run(host="0.0.0.0",port=616)
