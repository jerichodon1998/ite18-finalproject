export class TodoModel {
	constructor(title, description, done, timestamp, listId, fileUrl, fileName, id) {
		this.title = title;
		this.description = description;
		this.done = done;
		this.timestamp = timestamp;
		this.listId = listId;
		this.fileUrl = fileUrl;
		this.fileName = fileName;
		this.id = id;
	}
}
