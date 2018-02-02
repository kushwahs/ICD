sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("fypICD.controller.view2", {
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Route_view2").attachMatched(this._onRouteMatched,
				this);

		},
		_onRouteMatched: function(oEvent) {
			var items = sap.ui.getCore().byId("__xmlview1--__table0").getItems();
			// var items = sap.ui.getCore().byId("__table2").getItems();
			var path = items[1]._aSelectedPaths[0];
			sap.ui.getCore().byId("__xmlview2").bindElement(path + "/transaction");
			// this.getView().bindElement(path);
		},
		save: function() {
			debugger;
			// var oModel = this.getView().getModel();
			// var record = {};
			// var items = sap.ui.getCore().byId("__xmlview1--Mytable").getItems();
			// var entity = items[1]._aSelectedPaths[0];
			// var path = entity + "/transaction";
			// record. = sap.ui.getCore().byId("__xmlview2--trasaction_nav_id").getValue();
			// record.Street = sap.ui.getCore().byId("__xmlview2--transaction_id").getValue();
			// record.Full_Name = sap.ui.getCore().byId("__xmlview2--corrected_batch").getValue();
			// record.City = sap.ui.getCore().byId("__xmlview2--flow").getValue();
			// record.Country = sap.ui.getCore().byId("__xmlview2--sequence_number").getValue();
			// record.Postal_Code = sap.ui.getCore().byId("__xmlview2--net_amount").getValue();
			// oModel.update(path, record, {
			// 	success: function(oData, response) {
			// 		MessageToast.show("Record Updated");
			// 	}
			// }, {
			// 	error: function(oError) {
			// 		MessageBox.error(oError);
			// 	}
			// });
			window.history.go(-1);
		},
		onNavBack: function() {
			window.history.go(-1);
		}
	});
});