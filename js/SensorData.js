/**

以下のようなXMLノードのjQueryオブジェクトを引数に、センサデータのインスタンスを作成する

<transducerValue rawvalue='52' timestamp='2014-01-08T18:54:21.485+09:00' typedvalue='52' id='unko'/>

**/

function SensorData(xml){
    var jQueryObject = $(xml);
    this.xmlString = xml;
    this.rawValue = jQueryObject.attr("rawvalue");
    this.typedValue = jQueryObject.attr("typedvalue");
    this.id = jQueryObject.attr("id");
    
    var timeParser = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).(\d+)\+(\d+)/;
    var timeReg = timeParser.exec(jQueryObject.attr("timestamp"));
    this.timestamp = new Date(timeReg[1], parseInt(timeReg[2])-1, timeReg[3], timeReg[4], timeReg[5], timeReg[6]);
}

SensorData.prototype.getId = function(){
    return this.id;
};

/**
 * 単位変換前の生データを返す
 **/
SensorData.prototype.getRawValue = function(){
    return this.rawValue;
};

/**
 * センサデータ生成時刻を表すDateオブジェクトを返す
 **/
SensorData.prototype.getTimestap = function(){
    return this.timestamp;
};

/**
 * 単位変換後のデータを返す
 **/
SensorData.prototype.getTypedValue = function(){
    return this.typedValue;
};

/**
 * このセンサデータの文字列表現を返す
 **/
SensorData.prototype.toString = function(){
    return "SensorData[rawValue="+this.rawValue+", typedValue="+this.typedValue+", timestamp="+this.timestamp.toString()+", id="+this.id+"]";
};
