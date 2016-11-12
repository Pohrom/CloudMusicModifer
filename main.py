# coding:utf-8
import json
import websocket
import requests

LOCAL_DEBUG_PORT = 2016
id = 0
ws = websocket.WebSocket()

def modify_it(appinfo):
    connect(appinfo["webSocketDebuggerUrl"])
    f = open('core.js','r')
    code = f.read()
    execute(code)
    ws.close()

def connect(ws_url):
    ws.connect(ws_url)

def execute(code):
    global id
    jmodifer = json.dumps({
		"id": id,
		"method": "Runtime.evaluate",
		"params": {"expression": code}
	})
    id = id+1
    ws.send(jmodifer)
    result = ws.recv()
    print result

resp = requests.get("http://localhost:%d/json" % (LOCAL_DEBUG_PORT))
applist = json.loads(resp.text)
if len(applist) == 1:
	modify_it(applist[0])
