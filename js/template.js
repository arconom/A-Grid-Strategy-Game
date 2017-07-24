var ComponentListTemplate =
{
    render: function (model) {
        console.log("ComponentListTemplate.render");
        return this._body(model);
    }
    , _body: function (model) {
        console.log("ComponentListTemplate._body");
        var returnMe = [];

        for (var i = 0; i < model.length; i++) {
            var item = this.item(model[i], model[i].checked);
            item.className += " " + this.getEvenOrOdd(i);
            returnMe.push(item);
        }

        return returnMe;
    }
    , getEvenOrOdd: function (i) {
        if (i % 2 == 0) {
            return "even";
        }
        else {
            return "odd";
        }
    }
    , componentControls: function (model, editable) {
        // todo make this a bit more reusable by decoupling it from the structure of the data
        // ideally this will take a data item and produce a column for each property
        //console.log("ComponentListTemplate.componentControls");
        var returnMe =
        [
            this.getCheckbox(model.checked, "toggle")
            , this.getTextControl(editable, model.category, "input", "category")
            , this.getTextControl(editable, model.name, "input", "name")
            , this.getTextControl(editable, editable ? model.valueFormula : model.value, "input", "value")
            , this.getTextControl(editable, editable ? model.costFormula : model.cost, "input", "cost")
            //, this.getTextControl(false, model.total, "label", "total")
        ];

        if (editable) {
            returnMe.push(this.getButton("X", "destroy"));
            returnMe.push(this.getTextControl(editable, model.description, "textarea", "description"));
        }
        else {
            returnMe.push(this.getTextControl(editable, model.description, "textarea", "description"));
            returnMe.push(this.getButton("X", "destroy"));
        }

        return returnMe;
    }
    , item: function (model, edit) {
        return this.getListItem(this.componentControls(model, edit), model.id);
    }
    , getListItem: function (controls, id) {
        console.log("ComponentListTemplate.getListItem");
        var returnMe = {};
        returnMe = Helper.createContainer("div", controls);
        returnMe.setAttribute("data-id", id);
        return returnMe;
    }
    , getTextControl: function (editable, value, type, css) {
        console.log("ComponentListTemplate.getTextControl");
        if (editable) {
            if (type === "input") {
                return this.getInput("text", value, css);
            }
            else if (type === "textarea") {
                return this.getTextArea(value, css);
            }
            else if (type === "label") {
                return this.getLabel(value, css);
            }
        }
        else {
            return this.getLabel(value, css);
        }
    }
    , getInput: function (type, value, css) {
        //console.log("ComponentListTemplate.getInput");
        var returnMe = document.createElement("input")
        returnMe.setAttribute("Type", type);
        returnMe.setAttribute("Value", value);
        returnMe.className = css;
        return returnMe;
    }
    , getButton: function (value, css) {
        //console.log("ComponentListTemplate.getButton");
        var returnMe = this.getInput("submit", value, css);
        return returnMe;
    }
    , getCheckbox: function (checked, css) {
        //console.log("ComponentListTemplate.getCheckbox");
        var returnMe = this.getInput("Checkbox", "", css);

        if (checked) {
            returnMe.setAttribute("checked", "");
        }
        else { }

        return returnMe;
    }
    , getLabel: function (value, css) {
        //console.log("ComponentListTemplate.getLabel");
        var returnMe = document.createElement("label")
        returnMe.textContent = value;
        returnMe.className = css;
        return returnMe;
    }
    , getTextArea: function (value, css) {
        //console.log("ComponentListTemplate.getTextArea");
        var returnMe = document.createElement("textarea")
        returnMe.textContent = value;
        returnMe.className = css;
        return returnMe;
    }
}