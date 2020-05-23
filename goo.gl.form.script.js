function Initialize() {
    try {
        var triggers = ScriptApp.getProjectTriggers();
        for (var i in triggers) {
            ScriptApp.deleteTrigger(triggers[i]);
        }

        ScriptApp.newTrigger("SubmitGoogleFormData")
            .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
            .onFormSubmit()
            .create();
    } catch (error) {
        throw new Error("Please add this code in the Google Spreadsheet");
    }
}

function SubmitGoogleFormData(e) {
    if (!e) {
        throw new Error("Please go the Run menu and choose Initialize");
    }

    try {
        const
            sheet = SpreadsheetApp.getActiveSheet(),
            lastRow = sheet.getLastRow(),

            customerName        = sheet.getRange(lastRow, 2, 1, 1).getValue(),
            contactNumber       = sheet.getRange(lastRow, 3, 1, 1).getValue(),
            email               = sheet.getRange(lastRow, 4, 1, 1).getValue(),
            facebook            = sheet.getRange(lastRow, 5, 1, 1).getValue(),
            instagram           = sheet.getRange(lastRow, 6, 1, 1).getValue(),
            deliveryAddress     = sheet.getRange(lastRow, 7, 1, 1).getValue(),

            order1              = sheet.getRange(lastRow, 8, 1, 1).getValue(),
            quantity1           = sheet.getRange(lastRow, 9, 1, 1).getValue(),

            order2              = sheet.getRange(lastRow, 11, 1, 1).getValue(),
            quantity2           = sheet.getRange(lastRow, 12, 1, 1).getValue(),

            order3              = sheet.getRange(lastRow, 14, 1, 1).getValue(),
            quantity3           = sheet.getRange(lastRow, 15, 1, 1).getValue(),

            order4              = sheet.getRange(lastRow, 17, 1, 1).getValue(),
            quantity4           = sheet.getRange(lastRow, 18, 1, 1).getValue(),

            order5              = sheet.getRange(lastRow, 20, 1, 1).getValue(),
            quantity5           = sheet.getRange(lastRow, 21, 1, 1).getValue(),

            pickupDate          = sheet.getRange(lastRow, 22, 1, 1).getValue(),
            pickupLocation      = sheet.getRange(lastRow, 23, 1, 1).getValue(),
            request             = sheet.getRange(lastRow, 24, 1, 1).getValue();

        let orders = [
            { name: order1, quantity: quantity1 }
        ];

        if (order2) {
            orders.push({ name: order2, quantity: quantity2 });
        }

        if (order3) {
            orders.push({ name: order3, quantity: quantity3 });
        }

        if (order4) {
            orders.push({ name: order4, quantity: quantity4 });
        }

        if (order5) {
            orders.push({ name: order5, quantity: quantity5 });
        }

        const payload = {
            customerName,
            contactNumber,
            email,
            facebook,
            instagram,
            deliveryAddress,
            orders,
            pickupDate,
            pickupLocation,
            request,
            fromExternalForm: true
        };

        const headers = {
            "Authorization" : "Basic " + Utilities.base64Encode('99uEzPjdf3U6crJHr35p:X')
        };

        const options = {
            method: "POST",
            contentType: "application/json",
            headers: headers,
            payload: JSON.stringify(payload),
            muteHttpExceptions: false
        };

        const url = "https://12afded8.ngrok.io";
        const response = UrlFetchApp.fetch(url + "/orders", options);


        Logger.log(JSON.stringify(response));
    } catch (error) {
        Logger.log(error.toString());
    }
}
