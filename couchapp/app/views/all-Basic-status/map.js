function(doc) {
	if ( doc._id.substr(0, 13) === "job:Basic-PenTest:" ) {
		emit([doc.Status,doc["PenTest Number"]],{
			"status": doc.Status,
			"due": doc["Complete-By Date"],
			"customer": doc["Company"],
			"qty": doc["number of Intrusions"],
			"prodt": doc["Mitigation Strategy"]
		});
	}
};
