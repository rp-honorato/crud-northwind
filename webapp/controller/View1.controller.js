sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrud.controller.View1", {
            onInit: function () {
                //this.onReadAll();
            },
            onReadAll: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    success: function (odata) {
                        console.log(odata);
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                });
            },
            onReadFilters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Filter('Rating', 'EQ', '3');
                oModel.read("/Products", {
                    filters: [oFilter], success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onReadSorter: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oSorter = new sap.ui.mode.Sorter('Price', true);
                oModel.read("/Products", {
                    filters: [oFilter], success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onReadParameters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    urlParameters: { $skip:0,$top:8 },
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onReadKey: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products(1)", {
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel({ results: [odata] });
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onEdit: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false)
                if (oEvent.getSource().getText() === "Edit") {
                    oEvent.getSource().setText("Submit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                } else {
                    oEvent.getSource().setText("Edit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                    var oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                    var oId = oEvent.getSource().getBindingContext().getProperty("ID");
                    oModel.update("/Products(" + oId + ")", { Rating: oInput }, {
                        success: function (odata) {
                            that.onReadAll();
                        }, error: function (oError) {
                            console.log(oError);
                        }
                    })
                }
            },
            onDuplicate: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                var oDuplicateData = oEvent.getSource().getBindingContext().getObject();
                oDuplicateData.ID = 100 + oDuplicateData.ID;
                oModel.create("/Products()", oDuplicateData, {
                    success: function (odata) {
                        that.onReadAll();
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            },
            onDelete: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                var oId = oEvent.getSource().getBindingContext().getProperty("ID");
                oModel.remove("/Products(" + oId + ")", {
                    success: function (odata) {
                        that.onReadAll();
                    }, error: function (oError) {
                        console.log(oError);
                    }
                })
            }
        });
    });
