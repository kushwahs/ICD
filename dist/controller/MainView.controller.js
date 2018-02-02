jQuery.sap.require("fypICD.util.Formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"

], function(Controller, Fragment) {
	"use strict";

	return Controller.extend("fypICD.controller.MainView", {
	
	onInit: function() {
       debugger;
        this.theTokenInput = this.getView().byId("multiInput");
        this.aTokens = [];
        this.theTokenInput.setTokens(this.aTokens);
      },
		// iconVis: function(oValue) {
		// 	// if (oValue === "E") {
		// 	// 	return "sap-icon://color-fill";
		// 	// } else if (oValue === "P") {
		// 	// 	return "sap-icon://status-positive";
		// 	// }

		// 	return "sap-icon://color-fill";
		// },

		// iconColor: function(oValue) {

		// 	// Your logic for rowHighlight goes here
		// 	if (oValue === "E") {
		// 		return "Negative";
		// 	} else if (oValue === "P") {
		// 		return "#ffcc33";
		// 	}
		// 	return "Positive";
		// },
		selrow: function() {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
			this.router.navTo("Route_view2", {
				path: "vijay"
			});
		},

		// 	onPressSupplier: function(oEvent) {
		//var supplier = oEvent.getSource().getBindingContext().getProperty("inputControl/ID"); // read SupplierID from OData path Product/SupplierID
		//var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"); // get a handle on the global XAppNav service
		//var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
		//target: {
		//semanticObject: "inputControlType",
		//action: "display"
		//},
		//params: {
		//"supplierID": supplier
		//}
		//})) || ""; // generate the Hash to display a Supplier
		//oCrossAppNavigator.toExternal({
		//target: {
		//shellHash: hash
		//}
		//}); // navigate to Supplier application
		//}

		// },

		// setCurrentDate: function(oValue) {
		// 	debugger;
		// 	return new Date();

		// },

		// setPreviousDate: function(oValue) {
		// 	debugger;
		// 	return new Date();
		// 	// return "Fri Dec 31 9999 23:59:59 GMT+0530";
		// 	// 		// var fromDate = new Date();
		// 	// 		// var oFromDate = this.getView().byId('__CreatedOnFrom')

		// 	// 		// var prevDate = this._manipulateDate(fromDate, 30, "sub");
		// 	// 		// oFromDate.setDateValue(prevDate);
		// },
		// _updateCustomFilter: function() {

		// 	var oSmartFilterbar = this.getView().byId("__xmlview1--smartFilterBar");

		// 	if (oSmartFilterbar) {

		// 		var oCtrl = oSmartFilterbar.determineControlByName("STATUS");

		// 		if (oCtrl) {
		// 			oSmartFilterbar.setFilterData({
		// 				_CUSTOM: {
		// 					STATUS: oCtrl.getSelectedKey()
		// 				}
		// 			});
		// 		}
		// 	}
		// },
		// onBeforeVariantFetch: function(oEvent) {
		// 	this._updateCustomFilter();
		// },
		// onExit: function() {
		// 	this.destroy();
		// },
		onBeforeRebindTable: function(oEvent) {
			debugger;
			var oBindingParams = oEvent.getParameter("bindingParams");
			oBindingParams.parameters = oBindingParams.parameters || {};
			var query = "CPE";
			var oSmartTable = oEvent.getSource();
			var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
			if (oSmartFilterBar instanceof sap.ui.comp.smartfilterbar.SmartFilterBar) {
				var oCustomControl = oSmartFilterBar.getControlByKey("STATUS");
				// if (oCustomControl instanceof sap.m.ComboBox) {
				// 	var status = oCustomControl.getSelected();
				// 	switch (status) {
				// 		case "C":
				// 			oBindingParams.filters.push(new sap.ui.model.Filter('STATUS', 'EQ', "C"));
				// 			break;
				// 		case "P":
				// 			oBindingParams.filters.push(new sap.ui.model.Filter('STATUS', 'EQ', "P"));
				// 			break;
				// 		case "E":
				// 			oBindingParams.filters.push(new sap.ui.model.Filter('STATUS', 'EQ', "E"));
				// 			break;
				// 		case "ALL":
				// 			oBindingParams.filters.push(new sap.ui.model.Filter('STATUS', 'CT', query));
				// 			break;
				// 	}
				// }
				
				if(oCustomControl instanceof sap.m.CheckBox)
				{
					var bSelected = oCustomControl.getSelected();
					if(bSelected)
					{
							oBindingParams.filters.push(new sap.ui.model.Filter('STATUS', 'EQ', "E"));
					}
				}
				
				var oMultiInputCustomControl = oSmartFilterBar.getControlByKey("DATA_SOURCE");
				
					if(oMultiInputCustomControl instanceof sap.m.MultiInput)
				{
					
					var sDataSource = oMultiInputCustomControl.getProperty("value");
				
				if(!sDataSource)
				{
					sDataSource= oMultiInputCustomControl._tokenizer._oScroller._$Container["0"].innerText.trim();
				}
				if(sDataSource)
				{
					
					oBindingParams.filters.push(new sap.ui.model.Filter('DATA_SOURCE', 'EQ', sDataSource));
				}
						
				}
				
			}
		},
		handleF4CompanyCode: function() {
			var that=this;
	
			var oInput = this.getView().byId("multiInput");

			if (!this._oValueHelpDailog) {
				this._oValueHelpDailog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
					supportRanges: true,
					Key: "DATA_SOURCE",
					descriptionKey: "DATA_SOURCE",
					supportMultiselect:true,
					 title: "Assets",
          supportRangesOnly: false,
					ok: function(oControEvent) {
						debugger;
						that.aTokens = oControEvent.getParameter("tokens");
						that.theTokenInput.setTokens(that.aTokens);
						this.close();
					},
					cancel: function() {
						this.close();
					}
				});
			}
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
						label: "Data Source",
						template: "DATA_SOURCE"
					}, {
						label: "Description",
						template: "DESCR"
					}
					/* {label: "City",template:"City"},
					 {label: "Currency Code",template:"CurrencyCode"}*/
				]
			});
			var oTable = this._oValueHelpDailog.getTable();
			oTable.setModel(oColModel, "columns");

			//var oRowModel = new sap.ui.model.json.JSONModel("model/mock.json");
			// var oRowModel = new sap.ui.model.json.JSONModel("model/Currency.json");
			// var oRowModel = new sap.ui.model.json.JSONModel("dataSource");
			var oRowModel =this.getView().getModel('init_data');
			oTable.setModel(oRowModel);
			oTable.bindRows("/dataSources");
			this._oValueHelpDailog.setRangeKeyFields([{
				label: "Data Sourcee",
				key: "DATA_SOURCE"
			}, {
				label: "Description",
				key: "DESCR"
			}]);

			this._oValueHelpDailog.open();
		}

	});
});