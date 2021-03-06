from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)
count = 0
player_alliance = ['w','b']

@app.route('/')
def index():
	return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
	print('Message: ' + msg)
	global count
	global player_alliance
	emit('alliance', player_alliance[count%2])
	count+=1


@socketio.on('move')
def handle_move(move):
	print('Move' + json.dumps(move))
	emit('move',move,broadcast=True,include_self=False)

if __name__ == '__main__':
	socketio.run(app)
	#app.run()