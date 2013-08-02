function(doc) {
	if ( doc._id.substr(0, 11) === "job:Intermediate-PenTest:" ) {
		emit([doc.PenTest Status,doc["PenTest Number"]],{
            "status": doc.Status,
            "due": doc["Complete-By Date"],
            "customer": doc["Company"],
            "qty": doc["number of Intrusions"],
            "prodt": doc["Mitigation Strategy"]
		});
	}
};

    