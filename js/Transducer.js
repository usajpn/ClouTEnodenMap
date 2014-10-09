/**
以下のようなXMLノードのjQueryオブジェクトを引数に、transducer(センサまたは
アクチュエータ)のインスタンスを作成する。

<transducer
  name='current temperature' id='temp' canActuate='false'
  hasOwnNode='false' units='kelvin' unitScalar='0'
  minValue='270' maxValue='320' resolution='0.1'>
 </transducer>
**/


function Transducer(xml){
    var jQueryObject = $(xml);
    this.name = jQueryObject.attr("name");
    this.id = jQueryObject.attr("id");
    this.units = jQueryObject.attr("units");
    this.unitScaler = parseInt(jQueryObject.attr("unitScaler"));
    this.canActuate = jQueryObject.attr("canActuate") == "true";
    this.hasOwnNode = jQueryObject.attr("hasOwnNode") == "true";
    this.typeName = jQueryObject.attr("transducerTypeName");
    this.manufacturer = jQueryObject.attr("manufacturer");
    this.partNumber = jQueryObject.attr("partNumber");
    this.serialNumber = jQueryObject.attr("serialNumber");
    this.minValue = parseFloat(jQueryObject.attr("minValue"));
    this.maxValue = parseFloat(jQueryObject.attr("maxValue"));
    this.resolution = parseFloat(jQueryObject.attr("resolution"));
    this.precision = parseFloat(jQueryObject.attr("precision"));
    this.accuracy = parseFloat(jQueryObject.attr("accuracy"));
    this.sensorDataListener = null;
}

Transducer.prototype.setSensorDataListener = function(func){
    this.sensorDataListener = func;
};

Transducer.prototype.toString = function(){
    return "[Transducer name="+this.name+
	", id="+this.id+
	", units="+this.units+
	", unitScaler="+this.unitScaler+
	", canActuate="+this.canActuate+
	", hasOwnNode="+this.hasOwnNode+
	", typeName="+this.typeName+
	", manufacturer="+this.manufacturer+
	", partNumber="+this.partNumber+
	", serialNumber="+this.serialNumber+
	", minValue="+this.minValue+
	", maxValue="+this.maxValue+
	", resolution="+this.resolution+
	", precision="+this.resolution+
	", precision="+this.precision+
	", accuracy="+this.accuracy+"]";
};

/**
 * A human friendly identifier to distinguish between various possible transducers within a device
 **/
Transducer.prototype.getName = function(){
    return this.name;
}

/**
 * A unique identifier for the transducer used within the XML packet to enumerate different transducers within a single packet The tuple (UUID X, transducer id Y) MUST be unique such that a publish operation to a data value node X_data with the transducer id Y unambiguously refers to one and only one transducer.
 **/
Transducer.prototype.getId = function(){
    return this.id;
}

/**
 * Unit of measure (see below)
 **/
Transducer.prototype.getUnits = function(){
    return this.units;
}

/**
 * The scale of the unit as a power of 10 (i.e. n for 10 ** n)
 **/
Transducer.prototype.getUnitScaler = function(){
    return this.unitScaler;
}

/**
 * Indicates whether the transducer can be actuated
 **/
Transducer.prototype.isActuator = function(){
    return this.canActuate;
}

/**
 * Indicates whether the transducer data has its own node or whether it is part of the generic data value node 
 **/
Transducer.prototype.hasOwnNode = function(){
    return this.hasOwnNode;
}

/**
 * A human readable indication of the type of transducer
 **/
Transducer.prototype.getTypeName = function(){
    return this.typeName;
}

/**
 * Manufacturer of the transducer
 **/
Transducer.prototype.getManufacturer = function(){
    return this.manufacturer;
}

/**
 * Manufacturer's part number of the transducer
 **/
Transducer.prototype.getPartNumber = function(){
    return this.partNumber;
}

/**
 * Manufacturer's serial number of the transducer
 **/
Transducer.prototype.getSerialNumber = function(){
    return this.serialNumber;
}

/**
 * The expected minimum value for this transducer
 **/
Transducer.prototype.getMinValue = function(){
    return this.minValue;
}

/**
 * The expected maximum value for this transducer
 **/
Transducer.prototype.getMaxValue = function(){
    return this.maxValue;
}

/**
 * The resolution of the values reported by this transducer
 **/
Transducer.prototype.getResolution = function(){
    return this.resolution;
}

/**
 * The precision of the values reported by this transducer
 **/
Transducer.prototype.getPrecision = function(){
    return this.precision;
}

/**
 * The accuracy of the values reported by this transducer
 **/
Transducer.prototype.getAccuracy = function(){
    return this.accuracy;
}


