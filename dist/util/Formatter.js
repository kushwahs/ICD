jQuery.sap.declare("util.Formatter");

util.Formatter = {
	setStatusIcon: function(oValue) {
		return "sap-icon://color-fill";
	},
	setStatusIconColor: function(oValue) {
		if (oValue === "E") {
			return "Negative"; //red
		} else if (oValue === "P") {
			return "#ffcc33"; //yellow 
		}
		return "Positive"; // green
	},
	// setCurrentDate: function() {
	// 	return new Date();
	// },
	// setPreviousDate: function() {

	// 	return new Date(new Date().setDate(new Date().getDate() - 1));
	// },
	isCorrectedBatch: function(oValue) {
		if (oValue === "C") {
			return "Yes";
		} else  {
			return "No";
		}
	}

};