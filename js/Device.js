var connections = new Array();

/**
 * BOSHサービス(HTTP-XMPPブリッジ)のURLとXMPPサーバホスト名、ノード名を
 * 指定して、デバイスを作成する。ノード名には_dataや_metaを除いた部分を
 * 指定する。
 **/
function Device(boshService, xmppServer, nodeName) {
	this.boshService = boshService;
	this.xmppServer = xmppServer;
	this.nodeName = nodeName;
	this.connection = null;

	// properties of this device, which will be given by the server on subscription
	this.name = null;
	this.type = null;
	this.transducers = new Array();
	//array of transducers
	this.transducerMap = new Array();
	//(id, transducer) map
	this.sensorDataListener = null;
}

Device.prototype.toString = function() {
	return "[Device xmppServer=" + this.xmppServer + ", nodeName=" + this.nodeName + ", type=" + this.type + ", name=" + this.name + "]";
};

/**
 * Returns the name of this device
 **/
Device.prototype.getName = function() {
	return this.name;
};

/**
 * Returns the type of this device
 **/
Device.prototype.getType = function() {
	return this.type;
};

/**
 * Returns transducers array
 **/
Device.prototype.getTransducers = function() {
	return this.transducers;
};

/**
 * サブスクライブした瞬間にサーバから一度だけ送られてくる直近アイテムを処理する
 **/
Device.prototype._processLastPublishedItem = function(node, id, entry, timestamp) {
	//For soxPublisher.html, replace special character to tags
	entry = entry.toString().replace(/&lt;/g, "<");
	entry = entry.toString().replace(/&gt;/g, ">");
	entry = entry.toString().replace(/&apos;/g, "'");

	//_meta node
	if (node.indexOf('_meta') != -1) {
		var device = $(entry).find('device');
		this.name = $(device).attr('name');
		this.type = $(device).attr('type');

		var transducerElements = $(entry).find("transducer");
		for (var i = 0; i < transducerElements.length; i++) {
			var transducer = new Transducer(transducerElements.eq(i));
			this.transducers[i] = transducer;
			this.transducerMap[transducer.id] = transducer;
			if (this.sensorDataListener) {
				transducer.sensorDataListener = this.sensorDataListener;
			}
			console.log("Created " + transducer.toString());
		}
	}
};

/**
 * サーバから非同期に送られてくる最新アイテムを処理する
 **/
Device.prototype._processPublishedItem = function(node, id, entry) {
	//For soxPublisher.html, replace special character to tags
	entry = entry.toString().replace(/&lt;/g, "<");
	entry = entry.toString().replace(/&gt;/g, ">");
	entry = entry.toString().replace(/&apos;/g, "'");

	if (node.indexOf('_meta') != -1) {
		var device = $(entry).find('device');
		this.name = $(device).attr('name');
		this.type = $(device).attr('type');

		var transducerElements = $(entry).find("transducer");
		for (var i = 0; i < transducerElements.length; i++) {
			var transducer = new Transducer(transducerElements.eq(i));
			this.transducers[i] = transducer;
			this.transducerMap[transducer.id] = transducer;
			if (this.sensorDataListener) {
				transducer.sensorDataListener = this.sensorDataListener;
			}
			console.log("Created " + transducer.toString());
		}
	} else if (node.indexOf('_data') != -1) {

		var transducerValues = $(entry).find("transducerValue");
		for (var i = 0; i < transducerValues.length; i++) {
			var data = new SensorData(transducerValues.eq(i));
			var transducer = this.transducerMap[data.id];
			var listener = transducer ? transducer.sensorDataListener : null;
			if (listener) {
				listener(this, transducer, data);
			}
			console.log("Received " + data.toString());
		}
	}

};

/**
 * PRIVATE FUNCTION
 * コンストラクタに指定されたノード名に_metaと_dataを追加したノードをそれぞれ
 * サブスクライブする
 */
Device.prototype._subscribe = function(callback, callbackArg) {
	var me = this;

	//データ受信時のハンドラ登録
	this.connection.PubSub.bind('xmpp:pubsub:last-published-item', function(obj) {
		me._processLastPublishedItem(obj.node, obj.id, obj.entry, obj.timestamp);
	});
	this.connection.PubSub.bind('xmpp:pubsub:item-published', function(obj) {
		me._processPublishedItem(obj.node, obj.id, obj.entry);
	});

	this.connection.PubSub.subscribe(this.nodeName + "_meta").done(function(data) {
		//subscribe成功
		console.log("Subscribed: " + me.toString());
		if (callback) {
			callback(callbackArg);
		}
	}).fail(function() {
		//subscribe失敗
		console.log("Subscription Failed: " + me.toString());
		throw me;
	});
	this.connection.PubSub.subscribe(this.nodeName + "_data").done(function(data) {
		//subscribe成功
		console.log("Subscribed: " + me.toString());

		if (callback) {
			callback(callbackArg);
		}
	}).fail(function() {
		//subscribe失敗
		console.log("Subscription Failed: " + me.toString());
		throw me;
	});
};

/**
 * PRIVATE FUNCTION
 * サーバへの接続を確立し、受信データハンドラを登録する。
 */
Device.prototype._connect = function(callback, callbackArg) {
	this.connection = new Strophe.Connection(this.boshService);
	this.connection.rawInput = this.rawInput;
	this.connection.rawOutput = this.rawOutput;
	var me = this;
	this.connection.connect(this.xmppServer + "/pubsub", "", function(status) {
		if (status == Strophe.Status.CONNECTING) {
			console.log('Connecting...');
		} else if (status == Strophe.Status.CONNFAIL) {
			console.log('Failed to connect!');
			throw me;
		} else if (status == Strophe.Status.DISCONNECTING) {
			console.log('Disconnecting...');
		} else if (status == Strophe.Status.DISCONNECTED) {
			console.log('Disconnected');
		} else if (status == Strophe.Status.CONNECTED) {
			console.log("Connected to " + me.toString());
			me.connection.send($pres().c('priority').t('-1'));

			//接続確立したので100ミリ秒後にsubscribeをもう一度呼ぶ
			setTimeout(function() {
				me.subscribe(callback, callbackArg);
			}, 100);
		}
		return true;
	});
	connections[this.xmppServer] = this.connection;
};

/**
 * このデバイスをサブスクライブする。サブスクライブに失敗したら、このインスタンスを
 * 例外として投げる。サブスクライブに成功したらコールバック関数を呼び出す。
 **/
Device.prototype.subscribe = function(callback, callbackArg) {
	this.connection = connections[this.xmppServer];
	if (!this.connection) {
		console.log("Opening connection to " + this.toString());
		this._connect(callback, callbackArg);
		return;
	} else if (!this.connection.connected) {
		console.log("Not Connected");
		//コネクションが接続未完了なら、100ミリ秒後にもう一度subscribeを呼ぶ
		var me = this;
		setTimeout(function() {
			me.subscribe(callback, callbackArg);
		}, 100);
		return;
	} else {
		console.log("Subscribing " + this.toString());
		//コネクションが接続済みならsubscribe
		this._subscribe(callback, callbackArg);
	}
};

Device.prototype.rawInput = function(data) {
	if (window.console) {
		console.log("RECV: " + data);
	}
};

Device.prototype.rawOutput = function(data) {
	if (window.console) {
		console.log("SENT: " + data);
	}
};

/**
 * Sets the callback function invoked on receiving a new sensor data.
 * If this device contains multiple transducers, specified function will
 * be used for all of them. If you want to set different functions for
 * those transducers, please use Transducer::setSensorDataListener.
 * The function should accept (Device, Transducer, SensorData) instances
 * in this order
 **/
Device.prototype.setSensorDataListener = function(func) {
	this.sensorDataListener = func;
	for (var i = 0; i < this.transducers.length; i++) {
		this.transducers[i].sensorDataListener = func;
	}
};
