export class TodoModel {
	constructor(title, description, done, timestamp, listId, id) {
		this.title = title;
		this.description = description;
		this.done = done;
		this.timestamp = timestamp;
		this.listId = listId;
		this.id = id;
	}
}
