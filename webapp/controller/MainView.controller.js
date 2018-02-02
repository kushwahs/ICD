jQuery.sap.require("fypICD.util.Formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"

], function(Controller, Fragment) {
	"use strict";

	return Controller.extend("fypICD.controller.MainView", {

		onInit: function() {

			this.theTokenInput = this.getView().byId("multiInput");
			this.aKeys = ["DataSource", "Description"];
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

				if (oCustomControl instanceof sap.m.CheckBox) {
					var bSelected = oCustomControl.getSelected();
					if (bSelected) {
						oBindingParams.filters.push(new sap.ui.model.Filter('STATUS', 'EQ', "E"));
					}
				}

				var oMultiInputCustomControl = oSmartFilterBar.getControlByKey("DATA_SOURCE");

				if (oMultiInputCustomControl instanceof sap.m.MultiInput) {

					var sDataSource = oMultiInputCustomControl.getProperty("value");

					if (sDataSource) {
						oBindingParams.filters.push(new sap.ui.model.Filter('DATA_SOURCE', 'EQ', sDataSource));

					} else {
						var oTokens = oMultiInputCustomControl._tokenizer.getTokens();

						if (oTokens.length > 0) {
							for (var i = 0; i < oTokens.length; i++) {
								var sToken = oTokens[i].getKey();
								if (sToken) {
									oBindingParams.filters.push(new sap.ui.model.Filter('DATA_SOURCE', 'EQ', sToken));
								}
							}
						}
					}

				}

			}
		},
		handleF4CompanyCode: function(oEvent) {

			this.aItems = [{
				DataSource: "ENCOMPASS",
				Description: "ENCOMPASS"

			}, {
				DataSource: "SQUARE TRADE",
				Description: "SQUARE TRADE"
			}];
			var that = this;
			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			//	basicSearchText: this.theTokenInput.getValue(),
				title: "Assets",
			//	supportRanges: true,
				supportRangesOnly: false,
				supportMultiselect: true,
				key: this.aKeys[0],
				descriptionKey: this.aKeys[1],

				ok: function(oControlEvent) {
					that.aTokens = oControlEvent.getParameter("tokens");
					that.theTokenInput.setTokens(that.aTokens);
					//             var oSelectedRows = [];
					// var oValueHelpTable = oValueHelpDialog.getTable();
					// var oSelectedIndices = oValueHelpTable.getSelectedIndices();
					// for(var i=0;i<oSelectedIndices.length;i++){
					// 		var oIndex = String(oSelectedIndices[i]);
					// 		var oPath = oValueHelpTable.getBinding("rows").getPath();
					// 		var oModel = oValueHelpTable.getModel().getProperty(oPath+oIndex);
					// 		oSelectedRows.push(oModel);
					// }
					// alert(JSON.stringify(oSelectedRows));
					oValueHelpDialog.close();
				},

				cancel: function(oControlEvent) {
					sap.m.MessageToast.show("Cancel pressed!");
					oValueHelpDialog.close();
				},

				afterClose: function() {
					oValueHelpDialog.destroy();
				}
			});
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Asset Number",
					template: "DataSource"
				}, {
					label: "Asset Class",
					template: "Description"
				}]
			});
			oValueHelpDialog.getTable().setModel(oColModel, "columns");

			var oRowsModel = new sap.ui.model.json.JSONModel();
			oRowsModel.setData(this.aItems);
			oValueHelpDialog.getTable().setModel(oRowsModel);
			oValueHelpDialog.getTable().bindRows("/");

			oValueHelpDialog.setTokens(this.theTokenInput.getTokens());

			// var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			// 	advancedMode: true,
			// 	filterBarExpanded: false,
			// 	filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({
			// 			groupName: "gn1",
			// 			name: "n1",
			// 			label: "Data source",
			// 			control: new sap.m.Input()
			// 		}),
			// 		new sap.ui.comp.filterbar.FilterGroupItem({
			// 			groupName: "gn2",
			// 			name: "n2",
			// 			label: "Description",
			// 			control: new sap.m.Input()
			// 		})

			// 	],
			// 	search: function() {
			// 		sap.m.MessageToast.show("Search pressed '" + arguments[0].mParameters.selectionSet[0].getValue() + "''");
			// 	}
			// });

			// if (oFilterBar.setBasicSearch) {
			// 	oFilterBar.setBasicSearch(new sap.m.SearchField({
			// 		showSearchButton: false,
			// 		placeholder: "Search"
			// 	}));
			// }

			// oValueHelpDialog.setFilterBar(oFilterBar);

			oValueHelpDialog.open();
			oValueHelpDialog.update();
			oValueHelpDialog.addStyleClass("sapUiSizeCozy");
		}

	});
});