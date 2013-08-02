function(doc) {
	if ( doc._id.substr(0, 11) === "job:Intermediate-PenTest:" ) {
		emit( [doc["PenTest Number"],doc["Complete-By Date"],doc.Status],{
			"status": doc.Status,
			"customer": doc["Company"],
			"qty": doc["number of Intrusions"],
			"prodt": doc["Mitigation Strategy"]
		});
	}
};

    