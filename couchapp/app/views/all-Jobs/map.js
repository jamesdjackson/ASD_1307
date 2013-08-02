function(doc) {
	if ( doc._id.substr(0, 4) === "job:" ) {
		emit( [doc["PenTest Number"],doc["Complete-By Date"],doc.Status],{
			"status": doc.Status,
			"customer": doc["Company"],
			"qty": doc["Quantity"],
			"prodt": doc["Production Hours"]
		});
	}
};

  