function(doc) {
	if ( doc._id.substr(0, 12) === "job:Advanced-PenTest:" ) {
		emit([doc.Status,doc["PenTest Number"]],{
			"status": doc.Status,
			"due": doc["Complete-By Date"],
			"customer": doc["Company"],
			"qty": doc["Quantity"],
			"prodt": doc["Production Hours"]
		});
	}
};
